import React, { useEffect, useState, useContext } from 'react';
import { getGameReviews, postGameReview, getUser } from '../../services/gameService'; // Importe as funções getGameReviews e postGameReview
//import { getUser } from '../../services/userService'; // Importe a função getUser
import { useAuth } from '../../contexts/useAuth'
import { useParams } from 'react-router-dom';

async function fetchUserNames(reviews, setUserNames) {
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
  }

function GameReviews() {
    const { gameId } = useParams();
    const [reviews, setReviews] = useState([]);
    const user = useAuth(); // Usar o hook useAuth para obter o estado de autenticação, incluindo o userId

    useEffect(() => {
        async function fetchData() {
            try {
                const reviewsData = await getGameReviews(gameId);

                setReviews(reviewsData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [gameId]);

    const handleReviewSubmit = async (event) => {
        event.preventDefault(); // Impedir o comportamento padrão de envio do formulário

        const rating = event.target.elements.rating?.value;
        const comment = event.target.elements.comment?.value;

        try {
            // Enviar a nova avaliação para o backend
            const newReview = await postGameReview(gameId, rating, comment, user.id); // Use o userId obtido do contexto de autenticação

            // Atualizar a lista de avaliações exibidas no componente
            setReviews((prevReviews) => [...prevReviews, newReview]);
            event.target.reset();
        } catch (error) {
            console.error('Erro ao enviar a avaliação:', error);
        }
    };

    const [userNames, setUserNames] = useState({});

  useEffect(() => {
    fetchUserNames(reviews, setUserNames);
  }, [reviews]);

    return (
        <div>
            <h2>Avaliações do Jogo</h2>
            {reviews.map((review) => (
                <div key={review._id}>
                    <p>Nota: {review.rate}</p>
                    <p>Comentário: {review.comment}</p>
                    <p>Usuário: {userNames[review.user_id]}</p>
                </div>
            ))}

            <h3>Deixe sua Avaliação</h3>
            <form onSubmit={handleReviewSubmit}>
                <label>
                    Nota:
                    <input type="number" min="1" max="10" required name="rating" />
                </label>
                <label>
                    Comentário:
                    <textarea required name="comment" />
                </label>
                <button type="submit">Enviar Avaliação</button>
            </form>
        </div>
    );
}

export default GameReviews;