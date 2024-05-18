export class Storage {
  constructor() {
      this.storageKey = 'todos';
  }

  getTodos() {
      return JSON.parse(localStorage.getItem(this.storageKey));
  }

  saveTodos(todos) {
      localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
}
