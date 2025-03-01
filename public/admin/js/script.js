
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