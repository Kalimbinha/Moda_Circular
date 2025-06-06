// js/modules/likeButton.js
import { createElement } from '../utils.js';

/**
 * Cria um botão de curtir interativo para um post.
 * @param {boolean} isLikedInitial - Indica se o post está inicialmente curtido.
 * @param {number} initialLikes - O número inicial de curtidas.
 * @returns {object} Um objeto contendo o elemento do botão e um método para obter a contagem de curtidas.
 */
export function createLikeButton(isLikedInitial, initialLikes) {
    let isLiked = isLikedInitial;
    let likesCount = initialLikes;

    const likeButton = createElement('button', {
        className: 'action-button like-button',
        innerHTML: isLiked ? '❤️' : '🤍' // Unicode para coração preenchido/vazio
    });

    const likesCountElement = createElement('span', {
        className: 'post-likes-count',
        textContent: `${likesCount} curtidas`
    });

    likeButton.classList.toggle('liked', isLiked);

    likeButton.addEventListener('click', () => {
        isLiked = !isLiked;
        if (isLiked) {
            likesCount++;
            likeButton.innerHTML = '❤️';
            likeButton.classList.add('liked');
        } else {
            likesCount--;
            likeButton.innerHTML = '🤍';
            likeButton.classList.remove('liked');
        }
        likesCountElement.textContent = `${likesCount} curtidas`;
    });

    return {
        buttonElement: likeButton,
        likesCountElement: likesCountElement,
        getLikesCount: () => likesCount
    };
}