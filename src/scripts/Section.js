export class Section {
// объявим класс, который в конструктор принимает items (массив данных) и renderer (создание и отрисовка данных)
// второй параметр - selector, в который нужно добавлять созданные элементы
constructor({items, renderer}, containerselector) {
  this._container = document.querySelector(containerselector)
  this._items = items
  this._renderer = renderer
}
// метод, который отвечает за отрисовку всех элементов
renderItems() {
  this._items.forEach(data => { 
    this._renderer(data, this._container)
  })
}
// метод, который принимает DOM-элемент и добавляет его в контейнер
addItem(element) {
  this._container.prepend(element)
}
}
