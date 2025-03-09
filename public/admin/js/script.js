
const buttonStatus = document.querySelectorAll("[button-status]");

let url = new URL(window.location.href);

buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
    
        const status = button.getAttribute("button-status");

        if (status) {
            url.searchParams.set("status", status);
        } else {
            url.searchParams.delete("status");
        }


        window.location.href = url.href
    });
});

const formSearch  = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit",(e) =>{
        e.preventDefault(); //xóa sự kiện mặc định
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href
    });
}

const buttonPaginations = document.querySelectorAll("[buttonPagination]")
buttonPaginations.forEach(button => {
    button.addEventListener("click", () => {
    
        const numPage = button.getAttribute("buttonPagination");

        if (numPage) {
            url.searchParams.set("page", numPage);
        } else {
            url.searchParams.delete("page");
        }


        window.location.href = url.href
    });
}); 

//CheckBox Multi
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if(checkBoxMulti){
    const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']")
    const inputsId = checkBoxMulti.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked)
        {
            inputsId.forEach(input => {
                input.checked = true
            })
        }else{
            inputsId.forEach(input => {
                input.checked = false
            })
        }   
    })
    inputsId.forEach(item => {
        item.addEventListener("click", () =>{
            const countchecked = checkBoxMulti.querySelectorAll("input[name='id']:checked")
            if(countchecked == inputsId.length){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }

        })
    })

}
//CheckBox Multi end


//Form change multi
const formChangeMulti = document.querySelector("#form-change-multi")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (event)=>{
        event.preventDefault();
        const checkBoxMulti = document.querySelector("[checkbox-multi]");
        const typeChange = event.target.type.value;
        if(typeChange == "delete"){
            const isConfirm = confirm("bạn có muốn xóa sản phẩm không");
            if(!isConfirm){
                return
            }
        }
        const inputChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");
        if(inputChecked){
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            inputChecked.forEach(input =>{
                id = input.value
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    ids.push(`${id}-${position}`)
                }else{
                    ids.push(id)
                }
            })
            inputIds.value = ids.join(", ")
            console.log(inputIds.value);
            formChangeMulti.submit();
        }else{
            alert("Hãy chọn 1 dòng dữ liệu")
        }
    })
    
}
//Form change multi end

//alert cập nhật thông tin
const showalert = document.querySelector("[show-alert]");
if(showalert){
    const time = parseInt(showalert.getAttribute("data-time"));
    const closeAlert = showalert.querySelector("[close-alert]");
    setTimeout(()=>{
        showalert.classList.add("alert-hidden")
    },time)
    closeAlert.addEventListener("click",()=>{
        showalert.classList.add("alert-hidden")
    });
}

//Upload image
const uploadImg = document.querySelector("[uploadImage]")
if(uploadImg){
    const inputImg = document.querySelector("[upload-img-input]")
    const previewImg = document.querySelector("[upload-img-preview]")
    inputImg.addEventListener("change", (event) =>{
        const file = event.target.files[0]
        if(file){
          
            previewImg.src = URL.createObjectURL(file)
            console.log(previewImg.src)
        }
    })
}