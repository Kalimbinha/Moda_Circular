// js/utils.js
/**
 * Cria um elemento HTML com as tags e atributos especificados.
 * @param {string} tag - A tag HTML do elemento a ser criado (ex: 'div', 'img').
 * @param {object} attributes - Um objeto de atributos para o elemento (ex: {class: 'my-class', src: 'image.jpg'}).
 * @returns {HTMLElement} O elemento HTML criado.
 */
export function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        if (key === 'className') { // Para evitar conflito com 'class'
            element.classList.add(...attributes[key].split(' '));
        } else if (key === 'dataset') {
            for (const dataKey in attributes[key]) {
                element.dataset[dataKey] = attributes[key][dataKey];
            }
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    return element;
}