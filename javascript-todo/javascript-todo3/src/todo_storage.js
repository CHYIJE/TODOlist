"use strict";

const constants = Object.freeze({
  todos: "todos",
});

export default class TodoStorage {
  getTodos() {
    const loadedTodos = localStorage.getItem(constants.todos);
    return loadedTodos ? JSON.parse(loadedTodos) : [];
  }

  saveTodos(todos) {
    localStorage.setItem(constants.todos, JSON.stringify(todos));
  }
}
