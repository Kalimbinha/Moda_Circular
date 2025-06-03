// js/modules/post.js
import { createElement } from '../utils.js';
import { createLikeButton } from './likeButton.js';

/**
 * Cria um elemento de post do Instagram.
 * @param {object} postData - Os dados do post.
 * @param {string} postData.username - O nome de usuário do autor.
 * @param {string} postData.avatarUrl - URL da imagem do avatar do autor.
 * @param {string} postData.imageUrl - URL da imagem do post.
 * @param {string} postData.caption - A legenda do post.
 * @param {number} postData.likes - O número de curtidas.
 * @param {boolean} postData.isLiked - Se o usuário atual curtiu o post.
 * @returns {HTMLElement} O elemento HTML do post.
 */
export function createPost(postData) {
    const postElement = createElement('article', { className: 'post' });

    // Header do Post
    const postHeader = createElement('div', { className: 'post-header' });
    const avatar = createElement('div', { className: 'avatar' });
    avatar.appendChild(createElement('img', { src: postData.avatarUrl, alt: `${postData.username} avatar` }));
    const usernameLink = createElement('a', { className: 'username', href: '#', textContent: postData.username });
    postHeader.appendChild(avatar);
    postHeader.appendChild(usernameLink);

    // Imagem do Post
    const postImage = createElement('div', { className: 'post-image' });
    postImage.appendChild(createElement('img', { src: postData.imageUrl, alt: 'Post image' }));

    // Ações do Post (Curtir, Comentar, Compartilhar, Salvar)
    const postActions = createElement('div', { className: 'post-actions' });
    const { buttonElement: likeButtonElement, likesCountElement } = createLikeButton(postData.isLiked, postData.likes);
    postActions.appendChild(likeButtonElement);
    // Adicionar outros botões (comentário, compartilhar, salvar) futuramente
    postActions.appendChild(createElement('button', { className: 'action-button', innerHTML: '💬' })); // Exemplo de botão de comentário
    postActions.appendChild(createElement('button', { className: 'action-button', innerHTML: '✈️' })); // Exemplo de botão de compartilhamento
    postActions.appendChild(createElement('button', { className: 'action-button', style: 'margin-left: auto;', innerHTML: '🔖' })); // Exemplo de botão de salvar

    // Contagem de Curtidas
    // O likesCountElement já está sendo retornado pelo createLikeButton e será inserido no app.js

    // Legenda do Post
    const postCaption = createElement('div', { className: 'post-caption' });
    postCaption.innerHTML = `<a href="#" class="username">${postData.username}</a> ${postData.caption}`;

    // Comentários (placeholder)
    const postComments = createElement('div', { className: 'post-comments', textContent: 'Ver todos os comentários...' });

    // Montar o Post
    postElement.appendChild(postHeader);
    postElement.appendChild(postImage);
    postElement.appendChild(postActions);
    postElement.appendChild(likesCountElement); // Adiciona a contagem de curtidas
    postElement.appendChild(postCaption);
    postElement.appendChild(postComments);

    return postElement;
}