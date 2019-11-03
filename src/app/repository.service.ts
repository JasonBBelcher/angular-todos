import { Injectable } from "@angular/core";
import { Todo } from "./todo";
import { Observable, of } from "rxjs";

@Injectable()
export class RepositoryService {
  private todos: Array<Todo> = JSON.parse(localStorage.getItem("todos")) || [];

  createTodo(todotext) {
    this.todos.push(new Todo(Math.random() * 10, todotext, false, 0));

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  getTodos() {
    return of(this.todos);
  }

  updateTodo(todo) {
    const index = this.todos.findIndex(t => {
      return t.id === todo.id;
    });

    this.todos[index] = todo;

    localStorage.setItem("todos", JSON.stringify(this.todos));

    return of(this.todos);
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(this.todos));
    return of(this.todos);
  }

  clearTodos() {
    localStorage.removeItem("todos");
    return of([]);
  }
}
