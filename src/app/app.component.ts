import { Component, OnInit } from "@angular/core";
import { RepositoryService } from "./repository.service";
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  todos$: Observable<any[]>

  constructor(private api: ApiService, private repository: RepositoryService) { }

  ngOnInit() {
    this.todos$ = this.api.getTodos();
  }

  addTodo(input) {
    if (input.value) {
      this.api.createTodo(input.value).subscribe(() => {
        this.getTodos();
      })

      input.value = "";
    } else {
      return;
    }
  }

  clearTodos() {
    this.api.clearTodos().subscribe(() => {
      this.todos$ = of([]);
    });
  }

  getTodos() {
    this.todos$ = this.api.getTodos();
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

    this.api.updateTodo(event.todo).subscribe(() => { })
  }

  toggleComplete(todo) {
    todo.completed = !todo.completed;
    this.api.updateTodo(todo).subscribe(() => { })
  }

  removeTodo(id) {
    this.api.removeTodo(id).subscribe(() => {
      this.getTodos();
    });
  }

  filterSearch(value) {

    if (value) {
      if (!isNaN(value)) {
        this.todos$ = this.todos$.pipe(map((todos) => {
          return todos.filter(
            todo => parseInt(todo.priority, 10) === parseInt(value, 10)
          );
        }))
      } else if (typeof value === "string") {
        this.todos$ = this.todos$.pipe(map((todos) => {
          return todos.filter(todo => {
            return todo.text.toLowerCase().indexOf(value.toLowerCase()) > -1;
          });
        }))
      }
    } else {
      this.getTodos();
    }
  }
}
