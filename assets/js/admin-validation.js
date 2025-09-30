const userAuthURL = "https://dummyjson.com/auth/login";

export async function adminValidation(name, password) {
    try{
  const response = await fetch(userAuthURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: name,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to admin validation: ${response.status}`);
  }
  
  const data = await response.json();
 // console.log(data);
 
  cookieAssign(data);

  }catch (error) {console.error("adminValidation : ",error)}
  
}

function cookieAssign(token){   
 document.cookie = `token=${token.accessToken}; path=/UserInfo-Display-App/`;
}

export function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    // Check if this cookie has the requested name
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return "";
}

//export let [tokenName, tokenValue] = document.cookie.split("=");

/* providing accessToken in bearer */
export async function getAdmin(token)  {
    //console.log(token);
    try{
  const response = await fetch(`https://dummyjson.com/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok){
    throw new Error(`Failed to fetch admin info: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data

  }catch (error) {
    console.error("GetAdmin : ",error )
    return null;
  }
}