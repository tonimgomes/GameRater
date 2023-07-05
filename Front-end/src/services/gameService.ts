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

export const getGamesByPlatform = async (platform: string): Promise<Game[]> => {
  const response = await getGames();
  const games = response.data;

  // Filtrar os jogos com base na plataforma
  const filteredGames = games.filter((game) => game.type.includes(platform));
  return filteredGames;
};

// Função para criar um novo jogo
export const createGame = (gameData: Partial<Game>): Promise<AxiosResponse<Game>> => {
  return axios.post<Game>(`${API_URL}/games`, gameData);
};

export async function getGameReviews(gameId) {
  try {
    const response = await fetch(`https://backend-gamerater.onrender.com/ratings?game_id=${gameId}`);
    if (!response.ok) {
      throw new Error('Falha ao obter as avaliações do jogo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postGameReview(gameId, rating, comment, userId) {
  try {
    // Enviar a avaliação para o backend
    const response = await axios.post(`${API_URL}/ratings`, {
      rate: rating,
      comment: comment,
      game_id: gameId,
      user_id: userId,
      // Você pode adicionar outros campos aqui, se necessário
    });
    // Retorna os dados da nova avaliação criada pelo backend
    return response.data;
  } catch (error) {
    throw new Error('Erro ao enviar a avaliação:', error);
  }
}

export async function getUser(userId) {
  try {
    const response = await fetch(`https://backend-gamerater.onrender.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Falha ao obter informações do usuário');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}