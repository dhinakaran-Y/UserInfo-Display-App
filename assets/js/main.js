import { adminValidation } from "./admin-validation";

const adminForm = document.getElementById("AdminForm");
const adminInputEl = document.getElementById("admin-name");
const adminPassEl = document.getElementById("admin-password");
const clearBtnEL = document.getElementById("clear-input");

adminForm.addEventListener("submit" , async(e) => {
    e.preventDefault();

    //console.log(adminInputEl.value, adminPassEl.value);
    
    await adminValidation(adminInputEl.value, adminPassEl.value);
 
 
    if (document.cookie === "") {
        window.location.href = "index.html"
    }else{
        window.location.href = `dashboard.html`;
    }
})

clearBtnEL.addEventListener('click',(e) => {
    adminInputEl.value = "";
    adminPassEl.value = "";
})