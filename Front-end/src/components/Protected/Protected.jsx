import { useAuth } from "../../contexts/useAuth"

export const Protected = ({ children }) => {
   const auth = useAuth()

   if(!auth.username) {
      return(
         <h1>You don't have access</h1>
      )
   }

   return children
}