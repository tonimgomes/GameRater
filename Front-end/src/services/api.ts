import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://backend-gamerater.onrender.com'; // Substitua pelo seu link do render.com

// Interface para o objeto de jogo
interface Game {
  _id: string;
  id_rawg: number;
  title: string;
  type: string[];
  genre: string[];
  imgPath: string;
  summary: string;
  developer: string[];
  rating: number;
}

// Função para obter os jogos
export const getGames = (): Promise<AxiosResponse<Game[]>> => {
  return axios.get<Game[]>(`${API_URL}/games`);
};

// Função para criar um novo jogo
export const createGame = (gameData: Partial<Game>): Promise<AxiosResponse<Game>> => {
  return axios.post<Game>(`${API_URL}/games`, gameData);
};

// Adicione outras funções conforme necessário para as outras rotas (reviews, users, etc.)
