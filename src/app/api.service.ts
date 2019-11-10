import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "./todo";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  URL: string;

  constructor(private http: HttpClient) {
    this.URL = `http://localhost:8080`;
  }

  getTodos(): Promise<any> {
    return this.http.get(`${this.URL}/todos`).toPromise();
  }

  createTodo(text: string): Promise<any> {
    return this.http
      .post(`${this.URL}/todo`, { text, completed: false, priority: 0 })
      .toPromise();
  }

  clearTodos(): Promise<any> {
    return this.http.delete(`${this.URL}/todos`).toPromise();
  }

  updateTodo(todo: Todo<string, boolean, string>): Promise<any> {
    return this.http.put(`${this.URL}/todo/${todo.id}`, todo).toPromise();
  }

  removeTodo(id: number): Promise<any> {
    return this.http.delete(`${this.URL}/todo/${id}`).toPromise();
  }
}
