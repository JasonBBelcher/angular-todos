import { Injectable } from "@angular/core";
import { Todo } from "./todo";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RepositoryService {
  private URL: string;
  private todos: Array<Todo<string, boolean, string>> = [];
  private filteredTodos: Array<Todo<string, boolean, string>>;

  constructor(private http: HttpClient) {
    this.URL = `http://localhost:8080`;
  }
  createTodo(text: string): Promise<any> {
    const todo = new Todo(text, false, 0);
    return this.http.post(`${this.URL}/todo`, todo).toPromise();
  }

  getTodos(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http
        .get(`${this.URL}/todos`)
        .toPromise()
        .then((todos: Todo<string, boolean, string>[]) => {
          this.todos = todos;
          resolve(this.todos);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateTodo(todo: Todo<string, boolean, string>): Promise<any> {
    return this.http.put(`${this.URL}/todo/${todo.uid}`, todo).toPromise();
  }

  removeTodo(uid: number): Promise<any> {
    return this.http.delete(`${this.URL}/todo/${uid}`).toPromise();
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
  }

  getFilteredTodos() {
    return Promise.resolve(this.filteredTodos);
  }

  filterSearch(value) {
    if (!isNaN(value)) {
      this.filteredTodos = this.todos.filter(
        (todo) => parseInt(todo.priority, 10) === parseInt(value, 10)
      );
    } else if (typeof value === "string") {
      this.filteredTodos = this.todos.filter((todo) => {
        return todo.text.toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
    }
    return Promise.resolve();
  }

  clearTodos(): Promise<any> {
    return this.http.delete(`${this.URL}/todos`).toPromise();
  }
}
