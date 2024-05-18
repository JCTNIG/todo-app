export class Todo {
  constructor(title, dueDate, description) {
      this.id = Date.now();
      this.title = title;
      this.dueDate = dueDate;
      this.description = description; // Added description property
      this.completed = false;
  }
}
