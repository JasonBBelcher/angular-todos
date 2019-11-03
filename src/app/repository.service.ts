import { Injectable } from "@angular/core";
import { Todo } from "./todo";
import { ApiService } from './api.service';

// This service mocks the backend.  

@Injectable()
export class RepositoryService {
  constructor(private api: ApiService) {

  }
  private todos: Array<Todo> = JSON.parse(localStorage.getItem("todos")) || [];

  createTodo(todotext) {
    this.todos.push(new Todo(Math.random() * 10, todotext, false, 0));

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  getTodos() {
    return Promise.resolve(this.todos);
  }

  updateTodo(todo) {
    const index = this.todos.findIndex(t => {
      return t._id === todo._id;
    });

    this.todos[index] = todo;

    localStorage.setItem("todos", JSON.stringify(this.todos));

    return Promise.resolve(this.todos);
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo._id !== id);
    localStorage.setItem("todos", JSON.stringify(this.todos));
    return Promise.resolve(this.todos);
  }

  clearTodos() {
    localStorage.removeItem("todos");
    return Promise.resolve((this.todos = []));
  }
}
