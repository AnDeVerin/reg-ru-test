/* eslint-disable no-unused-vars */

import style from './menu.scss';
import Component from '../component';

const data = [
  { title: 'Home', link: '/home' },
  { title: 'About', link: '/about' },
  { title: 'What ever', link: '/what-ever' },
];

export default class Menu extends Component {
  constructor({ element }) {
    super(element);
    this.render(data);

    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      this.onLinkClick(event);
    });
  }

  onLinkClick(event) {
    const link = event.target.closest('.menu__link');

    if (!link) return;
    const destination = link.getAttribute('href');
    this.trigger('menu.click', destination);
  }

  render(listData) {
    const items = listData.map(({ title, link }, i) => {
      const linkClass = i === 0 ? 'menu__link menu__link_active' : 'menu__link';
      return `<a class='${linkClass}' href='${link}'>${title}</a>`;
    });

    this.element.innerHTML = `
      <ul class='menu__list'>
        ${items.join('')}
      </ul>
    `;
  }
}
