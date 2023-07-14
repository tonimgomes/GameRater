import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById, getGameReviews } from '../../../services/gameService';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im';

import './JogosInfo.css';

const JogosInfo = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [countRatings, setCountRatings] = useState({
    5: 0, // Inicializa a contagem para 5 estrelas como 0
    4: 0, // Inicializa a contagem para 4 estrelas como 0
    3: 0, // Inicializa a contagem para 3 estrelas como 0
    2: 0, // Inicializa a contagem para 2 estrelas como 0
    1: 0, // Inicializa a contagem para 1 estrela como 0
  });

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await getGameById(gameId);
        setGame(response);
        const reviews = await getGameReviews(gameId);
        const newCountRatings = {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        };

        reviews.forEach((review) => {
          const stars = Math.floor(review.rate);
          newCountRatings[stars] += 1;
        });
        setCountRatings(newCountRatings);
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

  const renderRatingStars = (rating) => {
    let fullStars = Math.floor(rating);
    let decimal = (rating - Math.floor(rating))
    let emptyStars = 5 - Math.ceil(rating);
    let hasHalfStar;
    
    if(decimal < 0.2 && decimal != 0){
      hasHalfStar = 0;
      emptyStars += 1;
    }else if(decimal >= 0.75 ){
      hasHalfStar = 0;
      fullStars += 1;
    }else if(decimal != 0){
      hasHalfStar = 1;
    }
    
    const stars = [];

    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<ImStarFull key={`full-star-${i}`} />);
    }

    
    if (hasHalfStar) {
      stars.push(<ImStarHalf key="half-star" />);
    }
    
    for (let i = 0; i < emptyStars; i++) {
    stars.push(<ImStarEmpty key={`empty-star-${i}`} className="empty-star" />);
  }

    return stars;
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
      
      <div className="game-rating-info">
        <h2>Nota do Jogo</h2>
        {renderRatingStars(game.rating)}
      </div>
      <div className="rating-chart">
        <h2>Quantidade de Avaliações</h2>
        <div className="rating-bars-container">
          <span><ImStarFull/><ImStarFull/><ImStarFull/><ImStarFull/><ImStarFull/></span>
          <div className="bar" style={{ width: `${(countRatings[5] / game.numReviews) * 100}%` }}>
          <span>{countRatings[5]}</span>
          </div>
        </div>
        <div className="rating-bars-container">
          <span><ImStarFull/><ImStarFull/><ImStarFull/><ImStarFull/></span>
          <div className="bar" style={{ width: `${(countRatings[4] / game.numReviews) * 100}%` }}>
          <span>{countRatings[4]}</span>
          </div>
        </div>
        <div className="rating-bars-container">
          <span><ImStarFull/><ImStarFull/><ImStarFull/></span>
          <div className="bar" style={{ width: `${(countRatings[3] / game.numReviews) * 100}%` }}>
          <span>{countRatings[3]}</span>
          </div>
        </div>
        <div className="rating-bars-container">
          <span><ImStarFull/><ImStarFull/></span>
          <div className="bar" style={{ width: `${(countRatings[2] / game.numReviews) * 100}%` }}>
          <span>{countRatings[2]}</span>
          </div>
        </div>
        <div className="rating-bars-container">
          <span><ImStarFull/></span>
          <div className="bar" style={{ width: `${(countRatings[1] / game.numReviews) * 100}%` }}>
            <span>{countRatings[1]}</span>
          </div>
        </div>
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

