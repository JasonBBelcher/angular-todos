import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Todo } from './todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  URL: string;

  constructor(private http: HttpClient) {
    this.URL = `http://localhost:8080`;
  }

  getTodos(): Observable<any> {
    return this.http.get(`${this.URL}/todos`);
  }

  createTodo(text: string): Observable<any> {
    return this.http.post(`${this.URL}/todo`, { text, completed: false, priority: 0 });
  }

  clearTodos(): Observable<any> {
    return this.http.delete(`${this.URL}/todos`);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(`${this.URL}/todo/${todo._id}`, todo);
  }

  removeTodo(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/todo/${id}`);
  }
}
