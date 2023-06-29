import { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, setUserLocalStorage } from "./util";
import axios from 'axios';
import bcrypt from 'bcryptjs';

const API_URL = 'https://backend-gamerater.onrender.com';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = getUserLocalStorage()

      if(user) {
         setUser(user)
      }
  }, []);

  async function login(username, password){

    try {
      const response = await axios.get(`${API_URL}/users`);
      const users = response.data;
  
      const matchedUser = users.find(
        (user) =>
          user.name === username && bcrypt.compareSync(password, user.password)
      );
      if(!!matchedUser){
        const token = Math.random().toString(36).substring(2);
        const payload = { username, token };

        setUser(payload);
        setUserLocalStorage(payload);
        console.log(payload);
      }
  
      return !!matchedUser;
    } catch (error) {
      alert('Erro ao fazer login:', error);
      throw error;
    } 

  }

  const logout = () => {
    setUser(null)
    setUserLocalStorage(null)
  };

  
  return (
    <AuthContext.Provider
      value={{...user,login,logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};