"use strict";

import Todo from "./todo.js";

export default class TodoApp {
  constructor() {
    this.TODOS_LS = "todos";
    this.todos = [];
    this.items = document.querySelector(".items");
    this.todoInput = document.querySelector(".todo_input");
    this.addBtn = document.querySelector(".add_btn");
  }

  init() {
    this.addBtn.addEventListener("click", () => {
      this.addTodo();
    });

    this.items.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      if (id) {
        this.deleteTodo(id);
      }
    });

    window.addEventListener("load", () => {
      this.loadTodos();
    });
  }

  addTodo() {
    const todoText = this.todoInput.value;
    if (todoText === "") {
      this.todoInput.focus();
      return;
    }
    const todo = new Todo(this.todos.length + 1, todoText);
    this.todos.push(todo);

    const itemRow = this.createTodoElement(todo.id, todo.text);
    this.items.appendChild(itemRow);

    this.todoInput.value = "";
    this.todoInput.focus();
    this.saveTodos();
  }

  deleteTodo(id) {
    const newTodos = this.todos.filter((todo) => todo.id != id);
    this.todos = [...newTodos];
    this.saveTodos();

    const delTodo = document.querySelector(`.item_row[data-id="${id}"]`);
    delTodo.remove();
  }

  loadTodos() {
    const loadedTodos = localStorage.getItem(this.TODOS_LS);
    if (loadedTodos) {
      this.todos = JSON.parse(loadedTodos);
    }

    this.todos.forEach((todo, index, array) => {
      const itemRow = this.createTodoElement(todo.id, todo.text);
      this.items.appendChild(itemRow);
    });
  }

  saveTodos() {
    localStorage.setItem(this.TODOS_LS, JSON.stringify(this.todos));
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
