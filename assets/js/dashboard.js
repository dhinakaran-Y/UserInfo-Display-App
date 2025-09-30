import { getAdmin, getCookie } from "./admin-validation";
import { getStaffInfo } from "./staffs";

const tokenValue = getCookie("token");
//console.log("##", tokenValue);

//apram name cookie aa set and get pannu

if (!tokenValue) {
  window.location.href = "index.html";
} else {
  const adminInfo = await getAdmin(tokenValue);

  if (!adminInfo) {
      // If API call fails, clear cookie & redirect
      document.cookie =
        "token=; path=/UserInfo-Display-App/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      window.location.href = "index.html";
  } else {
    
    if (adminInfo.role !== "admin") {
      let infoDiv = document.querySelector("#UserName").parentElement.parentElement
      infoDiv.innerText = `You are not admin , you are a ${adminInfo.role} ,Admins can only access it.`;
      infoDiv.classList.add("text-red-500", "border", "border-2-red-500", "pb-10"); 
    }else{
      document.querySelector("#admin-info>div>#id").textContent = adminInfo.id;
      document.querySelector("#UserName").textContent = adminInfo.username;
      document.querySelector(
        "#FullName"
      ).textContent = `${adminInfo.firstName} ${adminInfo.lastName} ${adminInfo.maidenName}`;
      document.querySelector("#Age").textContent = adminInfo.age;
      document.querySelector("#Gender").textContent = adminInfo.gender;
      document.querySelector("#Email").textContent = adminInfo.email;
      document.querySelector("#PhoneNo").textContent = adminInfo.phone;
      document.querySelector("#role").textContent = adminInfo.role;
    }
  }
}

const staffFormEl = document.querySelector('#staff-info-form')
const staffIdEl = document.getElementById("staff-id");
const adminErrorEl = document.getElementById("admin-error-div")
// console.log(staffFormEl);

 staffFormEl.addEventListener('submit' , async(e) => {
   e.preventDefault()

   const staffData = await getStaffInfo(staffIdEl.value);
   let staffInfoDiv =document.querySelector("#staff-name").parentElement.parentElement;

   if (staffData.role == "admin") {
     staffInfoDiv.classList.replace('flex','hidden')
     adminErrorEl.classList.remove('hidden')
   } else {
    staffInfoDiv.classList.replace("hidden", "flex");
    adminErrorEl.classList.add('hidden')
     document.querySelector("#staff-id-no").textContent = staffIdEl.value;
     document.querySelector("#staff-name").textContent = staffData.username;
     document.querySelector(
       "#staff-FullName"
     ).textContent = `${staffData.firstName} ${staffData.lastName} ${staffData.maidenName}`;
     document.querySelector("#staff-Age").textContent = staffData.age;
     document.querySelector("#staff-Gender").textContent = staffData.gender;
     document.querySelector("#staff-Email").textContent = staffData.email;
     document.querySelector("#staff-PhoneNo").textContent = staffData.phone;
     document.querySelector("#staff-department").textContent =
       staffData.company.department;
     document.querySelector("#staff-role").textContent = staffData.role;
     document.querySelector("#staff-work").textContent = staffData.company.title;
     
     //to auto scroll down
     window.scrollBy({ top: 600, behavior: "smooth" });
   }
   
 })

