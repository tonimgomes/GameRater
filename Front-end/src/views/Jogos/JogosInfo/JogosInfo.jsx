import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../../services/gameService';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
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
          <MdKeyboardArrowLeft></MdKeyboardArrowLeft>
        </button>
        <button className="next-slide-button" onClick={handleNextSlide}>
        <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </button>
      </div>
      <div className="about">
        <h2>Sumário</h2>
        <p>{game.summary}</p>
      </div>
      <div className="game-details">
        <h2>Detalhes do Jogo</h2>
        <div className="details-grid">
          <div>
            <span>Plataformas</span>
            <p>{game.type.join(', ')}</p>
          </div>
          <div>
            <span>Gêneros</span>
            <p>{game.genre.join(', ')}</p>
          </div>
          <div>
            <span>Data de Lançamento</span>
            <p>{game.released}</p>
          </div>
          <div>
            <span>Tempo de Jogo</span>
            <p>{game.playtime}h</p>
          </div>
          <div>
            <span>Desenvolvedor</span>
            <p>{game.developer}</p>
          </div>
          <div>
            <span>Número de Avaliações</span>
            <p>{game.numReviews}</p>
          </div>
        </div>
      </div>
    </div>
        
  );
};

export default JogosInfo;

