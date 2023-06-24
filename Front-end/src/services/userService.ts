import axios from 'axios';
import bcrypt from 'bcryptjs';

const API_URL = 'https://backend-gamerater.onrender.com';

export async function login(username: string, password: string): Promise<boolean> {
  try {
    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;

    const matchedUser = users.find(
      (user: { name: string; password: string }) =>
        user.name === username && bcrypt.compareSync(password, user.password)
    );

    return !!matchedUser;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

export async function cadastro(username: string, email: string, password: string): Promise<void> {
  try {
    const newUser = {
      name: username,
      email: email,
      password: password,
    };

    // Fazer a requisição POST para cadastrar o novo usuário
    await axios.post(`${API_URL}/users`, newUser);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  }
}
