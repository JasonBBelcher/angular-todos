import { Component, OnInit } from "@angular/core";
import { RepositoryService } from "./repository.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  todos: any[];

  constructor(private repository: RepositoryService) { }

  ngOnInit() {
    this.repository.getTodos().then(todos => {
      this.todos = todos;
    });
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
    this.repository.clearTodos().then(todos => {
      this.todos = todos;
    });
  }

  getTodos() {
    this.repository.getTodos().then(todos => {
      this.todos = todos;
    });
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

    this.repository.updateTodo(event.todo);
  }

  toggleComplete(todo) {
    todo.completed = !todo.completed;
    this.repository.updateTodo(todo);
  }

  removeTodo(id) {
    this.repository.removeTodo(id).then(todos => {
      this.todos = todos;
    });
  }

  filterSearch(value) {
    if (value) {
      if (!isNaN(value)) {
        this.todos = this.todos.filter(
          todo => parseInt(todo.priority, 10) === parseInt(value, 10)
        );
      } else if (typeof value === "string") {
        this.todos = this.todos.filter(todo => {
          return todo.text.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
      }
    } else {
      this.getTodos();
    }
  }
}
