
const API_URL = 'https://backend-gamerater.onrender.com';

export function setUserLocalStorage(user) {
   localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage() {
   const json = localStorage.getItem('u')

   if(!json) {
      return null
   }

   const user = JSON.parse(json)

   return user ?? null
}