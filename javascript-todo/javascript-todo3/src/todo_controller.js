"use strict";

import Todo from "./todo.js";
import TodoStorage from "./todo_storage.js";

export default class TodoController {
  constructor() {
    this.TODOS_LS = "todos";
    this.todos = [];
    this.todoInput = document.querySelector(".todo_input");
    this.items = document.querySelector(".items");
    this.todoStorage = new TodoStorage();
  }

  addTodo() {
    const todoText = this.todoInput.value;
    if (todoText === "") {
      this.todoInput.focus();
      return;
    }
    const todo = new Todo(this.todos.length + 1, todoText);
    this.todos.push(todo);
    this.todoStorage.saveTodos(this.todos);

    const itemRow = this.createTodoElement(todo.id, todo.text);
    this.items.appendChild(itemRow);

    this.todoInput.value = "";
    this.todoInput.focus();
  }

  deleteTodo(id) {
    const newTodos = this.todos.filter((todo) => todo.id != id);
    this.todos = [...newTodos];
    this.todoStorage.saveTodos(this.todos);

    const delTodo = document.querySelector(`.item_row[data-id="${id}"]`);
    delTodo.remove();
  }

  loadTodos() {
    const loadedTodos = this.todoStorage.getTodos();
    this.todos = loadedTodos;

    this.todos.forEach((todo) => {
      const itemRow = this.createTodoElement(todo.id, todo.text);
      this.items.appendChild(itemRow);
    });
  }

  createTodoElement(id, text) {
    const itemRow = document.createElement("li");
    itemRow.setAttribute("class", "item_row");
    itemRow.setAttribute("data-id", id);
    itemRow.innerHTML = `
          <div class="item">
            <span class="text">${text}</span>
            <button id="delete_btn" data-id="${id}">
              <i class="fa-sharp fa-solid fa-trash" data-id="${id}"></i>
            </button>
          </div>
        `;
    return itemRow;
  }
}
