import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://backend-gamerater.onrender.com';

interface Game {
  _id: string;
  id_rawg: number;
  title: string;
  type: string[];
  genre: string[];
  imgPath: string;
  summary: string;
  developer: string[];
  playtime: number;
  released: Date;
  numReviews: number;
  rating: number;
  screenshots: string[]
}

export const getGames = (): Promise<AxiosResponse<Game[]>> => {
  return axios.get<Game[]>(`${API_URL}/games`);
};

export const getGameById = async (gameId: string): Promise<Game> => {
  try {
    const response = await getGames();
    const games = response.data;
    const game = games.find((game) => game._id === gameId);
    if (game) {
      return game;
    } else {
      throw new Error(`Jogo com o ID ${gameId} não encontrado.`);
    }
  } catch (error) {
    throw new Error(`Erro ao obter o jogo com o ID ${gameId}: ${error.message}`);
  }
};

export const getGamesByPlatform = async (platform: string): Promise<Game[]> => {
  const response = await getGames();
  const games = response.data;


  const filteredGames = games.filter((game) => game.type.includes(platform));
  return filteredGames;
};


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

    const response = await axios.post(`${API_URL}/ratings`, {
      rate: rating,
      comment: comment,
      game_id: gameId,
      user_id: userId,

    });

    return response.data;
  } catch (error) {
    throw new Error('Erro ao enviar a avaliação: ${error.message}');
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