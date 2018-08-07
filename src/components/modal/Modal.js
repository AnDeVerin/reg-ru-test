/* eslint-disable no-unused-vars */

import style from './modal.scss';
import Component from '../component';

export default class Modal extends Component {
  constructor({ element }) {
    super(element);
    this.hide();

    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      const button = event.target.closest('button');
      if (!button) return;
      this.onArticleClose();
    });
  }

  onArticleClose() {
    this.trigger('article.close');
  }

  render({ id, items }) {
    const currentItem = items.find(item => item.id === Number(id));
    if (!currentItem) throw Error('No such article!');

    const { title, text } = currentItem;
    this.element.innerHTML = `
      <button class='modal__close-btn'>&times;</button>
      <article class='article'>
        <header class='article__header'>
          ${title}
        </header>
        <p class='article__text'>${text}</p>
      </article>
    `;
  }
}
