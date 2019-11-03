import { Component, OnInit } from "@angular/core";
import { RepositoryService } from "./repository.service";
import { Observable } from "rxjs";
import { filter, flatMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  todos: Observable<any[]>;

  constructor(private repository: RepositoryService) {}

  ngOnInit() {
    this.todos = this.repository.getTodos();
  }

  addTodo(input) {
    if (input.value) {
      this.repository.createTodo(input.value);
      this.getTodos();
      input.value = "";
    } else {
      return;
    }
  }

  clearTodos() {
    this.todos = this.repository.clearTodos();
  }

  getTodos() {
    this.todos = this.repository.getTodos();
  }

  changePriority(event) {
    if (event.operation === "+") {
      event.todo.priority += 1;
    }
    if (event.operation === "-") {
      if (event.todo.priority > 0) {
        event.todo.priority -= 1;
      }
    }

    return (this.todos = this.repository.updateTodo(event.todo));
  }

  toggleComplete(todo) {
    todo.completed = !todo.completed;
    return (this.todos = this.repository.updateTodo(todo));
  }

  removeTodo(id) {
    this.todos = this.repository.removeTodo(id);
  }

  filterSearch(value) {
    if (value) {
      if (!isNaN(value)) {
        this.todos = this.todos.pipe(
          flatMap(todos => {
            return todos.filter(
              todo => parseInt(todo.priority, 10) === parseInt(value, 10)
            );
          })
        );
      } else if (typeof value === "string") {
        this.todos = this.todos.pipe(
          flatMap(todos => {
            return todos.filter(todo => {
              return todo.text.toLowerCase().indexOf(value.toLowerCase()) > -1;
            });
          })
        );
      }
    } else {
      this.todos = this.repository.getTodos();
    }
  }
}
