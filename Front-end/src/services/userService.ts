import axios from 'axios';

const API_URL = 'https://backend-gamerater.onrender.com';

export async function cadastro(username: string, email: string, password: string): Promise<void> {
  try {
    const newUser = {
      name: username,
      email: email,
      password: password,
    };


    await axios.post(`${API_URL}/users`, newUser);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  }
}
