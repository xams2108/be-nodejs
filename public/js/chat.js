const inputChat = document.querySelector(".chat-app .chat-input");
if (inputChat) {
    // Xử lý gửi tin nhắn (giữ nguyên)
    inputChat.addEventListener("submit", event => {
        event.preventDefault();
        content = event.target.input.value;
        if (content) {
            socket.emit("CLIENT_SEND_MESS", content);
            socket.emit("CLIENT_SEND_TYPING", "hide")
            event.target.input.value = "";
        }
    });

    // Xử lý nhận tin nhắn (giữ nguyên)
    socket.on("SERVER_RETURN_MESS", data => {
        const body = document.querySelector(".chat-app .chat-messages");
        const myId = document.querySelector(".myID").textContent;
        const isSent = myId === data.user_id;
        const messageType = isSent ? 'sent' : 'received';

        const div = document.createElement("div");
        div.className = `message ${messageType}`;

        div.innerHTML = `
      ${!isSent ? `<div class="sender">${data.infoUser?.email || 'Unknown'}</div>` : ''}
      <div class="content">${data.content}</div>
    `;

        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    });

    // Tự động scroll (giữ nguyên)
    const body = document.querySelector(".chat-app .chat-messages");
    if (body) {
        body.scrollTop = body.scrollHeight;
    }

    // Sửa phần emoji picker
    const buttonIcon = document.querySelector(".button-icon");
    if (buttonIcon) {
        const tooltip = document.querySelector(".tooltip");

        // Bỏ Popper và thay bằng toggle đơn giản
        buttonIcon.onclick = (e) => {
            e.stopPropagation();
            tooltip.classList.toggle("shown");
        };

        // Đóng tooltip khi click bên ngoài
        document.addEventListener("click", () => {
            tooltip.classList.remove("shown");
        });

        // Ngăn tooltip đóng khi click vào nó
        tooltip.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    // Xử lý chọn emoji
    const emojiPicker = document.querySelector("emoji-picker");
    if (emojiPicker) {
        emojiPicker.addEventListener("emoji-click", event => {
            const icon = event.detail.unicode;
            const inputField = inputChat.querySelector('input[name="input"]');
            if (inputField) {
                inputField.value += icon;
                inputField.focus();
            }
        });
    }
    var timeOut
    inputChat.addEventListener("keyup", () => {
        socket.emit("CLIENT_SEND_TYPING", "show")
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            socket.emit("CLIENT_SEND_TYPING", "hide")
        }, 3000)
    }
    )
    socket.on("SERVER_RETURN_TYPING", data => {
        console.log("DATA TYPING:", data); // Debug

        const typingContainer = document.querySelector(".box-typing");
        if (!typingContainer) {
            console.error("Không tìm thấy .box-typing");
            return;
        }

        if (data.type === "show") {
            // Hiển thị container nếu đang ẩn
            if (typingContainer.style.display !== "flex") {
                typingContainer.style.display = "flex";
            }

            // Kiểm tra user đã tồn tại chưa
            const userExists = typingContainer.querySelector(`[user-id="${data.user_id}"]`);
            if (!userExists) {
                const userElement = document.createElement("div");
                userElement.className = "typing-user";
                userElement.setAttribute("user-id", data.user_id)
                userElement.innerHTML = `
                    <div class="inner-name">${data.fullname}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                
                typingContainer.appendChild(userElement);

            }
        }
        else if (data.type === "hide") {
            const userElement = typingContainer.querySelector(`[user-id="${data.user_id}"]`);
            if (userElement) {
                userElement.remove();
                console.log("Đã xóa user typing:", data.user_id);

                // Ẩn container nếu không còn ai
                if (typingContainer.children.length === 0) {
                    typingContainer.style.display = "none";
                }
            }
        }
    });

}