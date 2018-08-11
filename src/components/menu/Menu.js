/* eslint-disable no-unused-vars */

import style from './menu.scss';
import Component from '../component';

const data = [
  { title: 'Home', link: '#' },
  { title: 'About', link: '#about' },
  { title: 'Contact', link: '#contact' },
];

export default class Menu extends Component {
  constructor({ element }) {
    super(element);
    this.render(data);

    this.on('click', ({ target }) => {
      if (target.tagName !== 'A') return;

      const activeLink = target;
      activeLink.classList.add('menu__link_active');
      const destination = activeLink.getAttribute('href');
      const allLinks = Array.from(this.element.querySelectorAll('.menu__link'));
      const passiveLinks = allLinks
        .filter(l => l.getAttribute('href') !== destination)
        .forEach(l => l.classList.remove('menu__link_active'));
    });
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
