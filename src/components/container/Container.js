/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import containerStyle from './container.scss';
import tileStyle from './tile.scss';
import Component from '../component';

export default class Container extends Component {
  constructor({ element }) {
    super(element);

    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      this.onLinkClick(event);
    });
  }

  onLinkClick(event) {
    const link = event.target.closest('.tile__link');

    if (!link) return;
    const tile = link.closest('[data-tile-id]');
    const { tileId } = tile.dataset;
    this.trigger('tile.click', tileId);
  }

  renderTiles(tiles) {
    this.element.innerHTML = tiles.map(tile => this.makeTile(tile)).join('');
  }

  // eslint-disable-next-line
  makeTile({ id, type, title, description }) {
    const tileClassName = type === 'double' ? 'tile tile_double' : 'tile';

    return `
      <div class='${tileClassName}' data-tile-id='${id}'>
        <div class='tile__wrapper'>
          <a class='tile__link' href='#'>
            <span class='tile__title'>${title}</span>
            <p class='tile__description'>${description}</p>
          </a>
        </div>
      </div>
    `;
  }
}
