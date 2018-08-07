export default class Component {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove('js-hidden');
  }

  hide() {
    this.element.classList.add('js-hidden');
  }

  on(eventName, handler) {
    this.element.addEventListener(eventName, handler);
  }

  trigger(eventName, data) {
    // eslint-disable-next-line
    const myEvent = new CustomEvent(eventName, {
      detail: data,
    });

    this.element.dispatchEvent(myEvent);
  }
}
