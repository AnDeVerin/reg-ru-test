/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import containerStyle from './homePage.scss';
import tileStyle from './tile.scss';


export default {
  render({ element, articles }) {
    element.innerHTML = articles.map(article => this.makeTile(article)).join('');
  },

  // eslint-disable-next-line
  makeTile({ id, type, title, description }) {
    const tileClassName = type === 'double' ? 'tile tile_double' : 'tile';

    return `
      <div class='${tileClassName}'>
        <div class='tile__wrapper'>
          <a class='tile__link' href='#article-${id}'>
            <span class='tile__title'>${title}</span>
            <p class='tile__description'>${description}</p>
          </a>
        </div>
      </div>
    `;
  },
};
