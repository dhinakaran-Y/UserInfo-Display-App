import { getAdmin, getCookie } from "./admin-validation";

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
      console.log(infoDiv.classList);
      infoDiv.innerText = `You are not admin , you are a ${adminInfo.role} ,Admins can only access it.`;
      infoDiv.classList.add("text-red-500", "border", "border-2-red-500", "pb-10"); 
      console.log(infoDiv.classList);
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
//console.log(adminInfo);
