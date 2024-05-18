import { Todo } from './todo';

export class TodoList {
    constructor(storage) {
        this.storage = storage;
        this.todos = this.storage.getTodos() || [];
    }

    addTodo(title, dueDate, description) {
        const todo = new Todo(title, dueDate, description);
        this.todos.push(todo);
        this.storage.saveTodos(this.todos);
        this.render();
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.storage.saveTodos(this.todos);
        this.render();
    }

    toggleTodoStatus(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.storage.saveTodos(this.todos);
            this.render();
        }
    }

    formatDueDate(dueDate) {
        const now = new Date();
        const due = new Date(dueDate);
        const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dueDateOnly = new Date(due.getFullYear(), due.getMonth(), due.getDate());
        const diffTime = dueDateOnly.getTime() - nowDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Tomorrow';
        } else if (diffDays < 0) {
            return 'Missed';
        } else {
            return 'Later';
        }
    }

    render() {
        const todoListElement = document.getElementById('todo-list');
        todoListElement.innerHTML = '';

        // Group todos by due date category
        const categories = {
            Missed: [],
            Today: [],
            Tomorrow: [],
            Later: []
        };

        this.todos.forEach(todo => {
            const category = this.formatDueDate(todo.dueDate);
            categories[category] ? categories[category].push(todo) : categories['Later'].push(todo);
        });

        // Render todos for each category
        Object.keys(categories).forEach(category => {
            const todos = categories[category];

            if (todos.length > 0) {
                const categoryHeader = document.createElement('h2');
                categoryHeader.textContent = category;
                todoListElement.appendChild(categoryHeader);

                const categoryList = document.createElement('ul');

                todos.forEach(todo => {
                    const todoItem = document.createElement('li');
                    todoItem.className = todo.completed ? 'completed' : '';

                    const titleSpan = document.createElement('span');
                    titleSpan.textContent = `${todo.title} - ${todo.description}`;

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => this.removeTodo(todo.id));

                    const statusCheckbox = document.createElement('input');
                    statusCheckbox.type = 'checkbox';
                    statusCheckbox.checked = todo.completed;
                    statusCheckbox.addEventListener('change', () => this.toggleTodoStatus(todo.id));

                    todoItem.appendChild(statusCheckbox);
                    todoItem.appendChild(titleSpan);
                    todoItem.appendChild(deleteButton);

                    categoryList.appendChild(todoItem);
                });

                todoListElement.appendChild(categoryList);
            }
        });
    }
}
