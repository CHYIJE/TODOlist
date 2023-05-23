"use strict";

import TodoController from "./todo_controller.js";

export default class TodoApp {
  constructor() {
    this.addBtn = document.querySelector(".add_btn");
    this.items = document.querySelector(".items");
    this.todoController = new TodoController();
  }

  init() {
    this.addBtn.addEventListener("click", () => {
      this.todoController.addTodo();
    });

    this.items.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      if (id) {
        this.todoController.deleteTodo(id);
      }
    });

    window.addEventListener("load", () => {
      this.todoController.loadTodos();
    });
  }
}
