import { Component, OnInit } from "@angular/core";
import { RepositoryService } from "./repository.service";
import { ApiService } from './api.service';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  todos: any[];

  constructor(private api: ApiService, private repository: RepositoryService) { }

  ngOnInit() {
    this.api.getTodos().then(todos => {
      this.todos = todos;
    });
  }

  addTodo(input) {
    if (input.value) {
      this.api.createTodo(input.value).then(() => {
        this.getTodos();
      })

      input.value = "";
    } else {
      return;
    }
  }

  clearTodos() {
    this.api.clearTodos().then(() => {
      this.todos = [];
    });
  }

  getTodos() {
    this.api.getTodos().then(todos => {
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

    this.api.updateTodo(event.todo).then(() => {
      this.getTodos();
    })
  }

  toggleComplete(todo) {
    todo.completed = !todo.completed;
    this.api.updateTodo(todo).then(() => {

    })
  }

  removeTodo(id) {
    this.api.removeTodo(id).then(todos => {
      this.getTodos();
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
