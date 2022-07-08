export class Section {
    // объявим класс, который в конструктор принимает items (массив данных) и renderer (создание и отрисовка данных)
    // второй параметр - selector, в который нужно добавлять созданные элементы
    constructor({renderer}, containerselector) {
       this._container = document.querySelector(containerselector);
      this._renderer = renderer;
    }
    // метод, который отвечает за отрисовку всех элементов
    renderItems(items) {
      items.forEach((item) => {
            this._renderer(item, this._container);
        });
    }
    // метод, который принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }
  }