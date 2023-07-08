import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../../services/gameService';
import './JogosInfo.css';

const JogosInfo = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await getGameById(gameId);
        console.log(response);
        setGame(response);
      } catch (error) {
        console.error('Erro ao obter o jogo:', error);
      }
    };

    fetchGame();
  }, [gameId]);

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? game.screenshots.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === game.screenshots.length - 1 ? 0 : prevSlide + 1));
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="jogos-info">
      <h1>{game.title}</h1>
      <div className="background-image" style={{ backgroundImage: `url(${game.imgPath})` }}></div>
      <div className="screenshots-container">
        {game.screenshots.map((screenshot, index) => (
          <div
            key={index}
            className={`screenshot-slide ${index === activeSlide ? "active" : ""}`}
          >
            <img
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="screenshot-image"
            />
          </div>
        ))}
        <button className="prev-slide-button" onClick={handlePrevSlide}>
          Anterior
        </button>
        <button className="next-slide-button" onClick={handleNextSlide}>
          Próximo
        </button>
      </div>
      <div className="about">
        <h2>About</h2>
        <p>{game.summary}</p>
      </div>
      <div className="game-details">
        <h2>Detalhes do Jogo</h2>
        <p>
          <span>Consoles:</span> {game.type.join(', ')}
        </p>
        <p>
          <span>Gêneros:</span> {game.genre.join(', ')}
        </p>
        <p>
          <span>Data de Lançamento:</span> {game.released}
        </p>
        <p>
          <span>Tempo de Jogo:</span> {game.playtime}
        </p>
        <p>
          <span>Desenvolvedor:</span> {game.developer}
        </p>
        <p>
          <span>Número de Avaliações:</span> {game.numReviews}
        </p>
      </div>
    </div>
  );
};

export default JogosInfo;

