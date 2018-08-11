/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import style from './articlePage.scss';

export default {

  render({ element, articles, id }) {
    const currentItem = articles.find(item => item.id === Number(id));
    if (!currentItem) throw Error('No such article!');

    const { title, text } = currentItem;
    element.innerHTML = `
      <article class='article'>
        <header class='article__header'>
          ${title}
        </header>
        <p class='article__text'>${text}</p>
      </article>
    `;
  },
};
