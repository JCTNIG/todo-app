import './styles/styles.css';
import { TodoList } from './todoList';
import { Storage } from './storage';

document.addEventListener('DOMContentLoaded', () => {
    const storage = new Storage();
    const todoList = new TodoList(storage);

    document.getElementById('add-todo').addEventListener('click', () => {
        const titleInput = document.getElementById('new-todo');
        const dueDateInput = document.getElementById('due-date');
        const descriptionInput = document.getElementById('description');
        const title = titleInput.value.trim();
        const dueDate = dueDateInput.value;
        const description = descriptionInput.value.trim();
        if (title && dueDate && description) {
            todoList.addTodo(title, dueDate, description);
            titleInput.value = '';
            dueDateInput.value = '';
            descriptionInput.value = '';
        }
    });

    todoList.render();
});

