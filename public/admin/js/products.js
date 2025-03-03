//Change status
console.log("Hello")
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus){
    buttonChangeStatus.forEach((button)=>{
        const form = document.querySelector("#form-change-status")
        const path = form.getAttribute("path")
        button.addEventListener("click", () =>{

            const status = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            console.log(status + id)

            const changeStatus =  status == "active"? "inactive": "active";

            const action =  path+`/${changeStatus}/${id}?_method=PATCH`;
            form.action = action;

            form.submit();
        })
    })
}
//Button delete
const formDelete = document.querySelector("#form-delete-product")
    if(formDelete){
        const buttonsDelete = document.querySelectorAll("[button-delete]")
        const path = formDelete.getAttribute("path")
        
        buttonsDelete.forEach(button =>{
            button.addEventListener("click", ()=>{
                const deleteid = button.getAttribute("deleted-id")
                const pathDelete = path+`/${deleteid}?_method=PATCH`
                formDelete.action = pathDelete
                formDelete.submit()

            })
        })
    }
//Button delete end 