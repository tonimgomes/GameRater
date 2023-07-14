import React, { useEffect, useState, useContext } from 'react';
import { getGameReviews, postGameReview, getUser, getGameById } from '../../services/gameService';
import { useAuth } from '../../contexts/useAuth';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import './GameReviews.css';

const GameReviews = () => {
const { gameId } = useParams();

const user = useAuth();

const [reviews, setReviews] = useState([]);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [rating, setRating] = useState(0); // Estado para controlar a quantidade de estrelas selecionadas
const [hoverRating, setHoverRating] = useState(0);
const [game, setGame] = useState(null);
const [userNames, setUserNames] = useState({});

// Função para obter os detalhes do jogo
useEffect(() => {
	const fetchData = async () => {
	try {
		const reviewsData = await getGameReviews(gameId);
		setReviews(reviewsData);

		const gameData = await getGameById(gameId); // Obter os detalhes do jogo
		setGame(gameData);
	} catch (error) {
		console.error(error);
	}
	};

	fetchData();
}, [gameId]);

// Função para obter os detalhes dos usuários
useEffect(() => {
	const fetchUserNames = async (reviews) => {
	try {
		const newNames = {};
		for (const review of reviews) {
		const userId = review.user_id;
		if (!newNames[userId]) {
			const user = await getUser(userId);
			newNames[userId] = user.name;
		}
		}
		setUserNames(newNames);
	} catch (error) {
		console.error('Erro ao obter nomes dos usuários:', error);
	}
	};

	fetchUserNames(reviews);
}, [reviews]);
// ------------------------------------

// Função para submeter a avaliação do jogo
const handleReviewSubmit = async (event) => {
	event.preventDefault();
	
	const comment = event.target.elements.comment?.value;

	try {
	const newReview = await postGameReview(gameId, rating, comment, user.id);
	setReviews((prevReviews) => [...prevReviews, newReview]);
	event.target.reset();
	setRating(0);
	} catch (error) {
	console.error('Erro ao enviar a avaliação:', error);
	}
};

// Funções para abrir e fechar o modal
const openModal = () => {
	setModalIsOpen(true);
};

const closeModal = () => {
	setModalIsOpen(false);
};
// ------------------------------------

// Funções handle da nota de avaliação
const handleStarClick = (starRating) => {
	setRating(starRating);
};

const handleStarHover = (star) => {
	setHoverRating(star);
};

const handleStarHoverExit = () => {
	setHoverRating(0);
};
// ------------------------------------

return (
	<div className="Principal">
		<div className='TelaComentario'>
			<h2>Deixe sua Opinião sobre o jogo</h2>
			<form className="formRating" onSubmit={handleReviewSubmit}>
				<div className="imgRating">
					<img src={game?.imgPath} alt="Imagem do jogo" /> 
					<p>{game?.title}</p> 
				</div>

				<div className="rating-container">
					<label>Avaliação:</label>
					<div className="star-rating">
						{[1, 2, 3, 4, 5].map((star) => (
							<FaStar
								key={star}
								className={
									star <= (hoverRating || rating) ? "star-icon filled" : "star-icon"
								}
								onClick={() => handleStarClick(star)}
								onMouseEnter={() => handleStarHover(star)}
								onMouseLeave={handleStarHoverExit}
							/>
						))}
					</div>
				</div>

				<div>
					<label>Comentário:</label>
					<textarea required name="comment" />
				</div>
				<button className="submitRating" type="submit">Enviar Avaliação</button>
			</form>
			<div className="commentRating">
				<button  onClick={() => openModal()}>
					Visualizar Comentários
				</button>
			</div>
		</div>

		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			className="modal-content"
			overlayClassName="modal-overlay"
		>
			<h2 className="tituloComentarios">Comentários</h2>

			{reviews.map((review) => (
				<div key={review._id}>
					<hr className="barra"></hr>
					<p>{userNames[review.user_id]} (Nota: {review.rate}): {review.comment} </p>
				</div>
			))}
		</Modal>
	</div>
);
};

export default GameReviews;