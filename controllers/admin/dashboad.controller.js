module.exports.index = (req,res)=>{
    res.render("admin/pages/dashboard",{
        title: "dasboard",
        text: "đay là dashboard",
   
    });
}