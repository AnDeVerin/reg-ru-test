/* eslint-disable no-restricted-globals */

import axios from 'axios';

import appRoutes from './app.routes';
import router from './router';
import Menu from '../menu/Menu';
import notFoundPage from '../pages/notFoundPage';

export default class App {
  initComponents() {
    this.menu = new Menu({ element: document.querySelector('.menu') });
    this.mainElement = document.querySelector('.main');

    axios.get('/api/tiles')
      .then(({ data }) => {
        this.tiles = [...data.tiles];
        this.renderRoute();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constructor({ element }) {
    this.element = element;
    this.render();

    this.tiles = [];
    this.routes = appRoutes;
    this.initRoutes();

    this.initComponents();
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
  }

  renderRoute() {
    const rawUrl = router.getUrl();
    console.log(rawUrl);
    // как вариант, можно использовать includes и подключить полифилы с polyfill.io
    // const [url, id] = rawUrl.includes('article-') ? rawUrl.split('-') : [rawUrl, null];
    // ниже кроссбраузерный вариант, кажется
    const [url, id] = (/^article-/.test(rawUrl)) ? rawUrl.split('-') : [rawUrl, null];

    let route = this.routes.find(r => r.path === url);

    const validId = !isNaN(id) && this.tiles.some(item => item.id === Number(id));

    if (!route || (url === 'article' && !validId)) route = { component: notFoundPage };

    route.component.render({ element: this.mainElement, articles: this.tiles, id });
  }

  render() {
    this.element.innerHTML = `
        <nav class="menu"></nav>
        <main class="main"></main>
      `;
  }
}
