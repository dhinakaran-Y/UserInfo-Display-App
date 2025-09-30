const STAFF_INFO_URL = "https://dummyjson.com/users/"; 

export async function getStaffInfo(id) {
    const response = await fetch(`${STAFF_INFO_URL}${id}`)
    const data = await response.json()
    return data
}