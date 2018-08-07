/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';

import template from './app.html';

import Menu from '../menu/Menu';
import Container from '../container/Container';
import Modal from '../modal/Modal';

export default class App {
  initComponents() {
    this.menu = new Menu({ element: document.querySelector('.menu') });
    this.container = new Container({ element: document.querySelector('.main') });
    this.modal = new Modal({ element: document.querySelector('.modal') });
    this.modalOverlay = document.querySelector('.modal-overlay');
    this.modalOverlay.classList.toggle('js-hidden');

    axios.get('/api/tiles').then(({ data }) => {
      this.tiles = [...data.tiles];
      this.container.renderTiles(this.tiles);
    });
  }

  constructor({ element }) {
    this.element = element;
    this.tiles = [];
    this.render();

    this.initComponents();

    this.menu.on('menu.click', event => console.log(`Go to ${event.detail}`));

    this.container.on('tile.click', (event) => {
      console.log(`Click on tile #${event.detail}`);
      this.modal.render({ id: event.detail, items: this.tiles });
      this.modalOverlay.classList.toggle('js-hidden');
      this.modal.show();
    });

    this.modal.on('article.close', this.closeModal.bind(this));
    this.modalOverlay.addEventListener('click', this.closeModal.bind(this));
  }

  closeModal() {
    this.modal.hide();
    this.modalOverlay.classList.toggle('js-hidden');
  }

  render() {
    this.element.innerHTML = template;
  }
}
