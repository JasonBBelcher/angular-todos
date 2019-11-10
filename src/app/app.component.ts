import { Component, OnInit } from "@angular/core";
import { RepositoryService } from "./repository.service";
import { Todo } from "./todo";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  todos: Todo<string, boolean, string>[];

  constructor(private repository: RepositoryService) {}

  ngOnInit() {
    this.repository.getTodos().then((todos) => {
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
    this.repository.clearTodos().then((todos) => {
      this.todos = todos;
    });
  }

  getTodos() {
    this.repository.getTodos().then((todos) => {
      this.todos = todos;
    });
  }

  changePriority(event) {
    this.repository.changePriority(event);
    this.repository.updateTodo(event.todo);
  }

  toggleComplete(todo) {
    todo.completed = !todo.completed;
    this.repository.updateTodo(todo);
  }

  removeTodo(id) {
    this.repository.removeTodo(id).then((todo) => {
      const filtered = this.todos.filter((t) => {
        return t.uid !== todo.uid;
      });
      this.todos = filtered;
    });
  }

  filterSearch(value) {
    if (!value) {
      this.repository.getTodos().then((todos) => {
        this.todos = todos;
      });
    } else {
      this.repository.filterSearch(value).then(() => {
        this.repository.getFilteredTodos().then((todos) => {
          this.todos = todos;
        });
      });
    }
  }
}
