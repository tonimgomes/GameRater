import { useAuth } from "../../contexts/useAuth"

export const Protected = ({ children }) => {
   const auth = useAuth()

   if(!auth.username) {
      return(
         <h1>Faça login ou cadastre-se para acessar a página.</h1>
      )
   }

   return children
}