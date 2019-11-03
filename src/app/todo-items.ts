import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from './todo';

@Component({
  selector: "app-todo-items",
  template: `
  <li *ngFor="let todo of todos">
       
  <p class="todo-text" [class.completed]="todo.completed">
  {{ todo.text }}
  </p>
  <span class="operators" (click)="onChangePriority('+', todo)">+</span>
  <span class="operators" (click)="onChangePriority('-', todo)">-</span>
  <p class="priority">priority: {{ todo.priority }}</p>
  
  <button (click)="onRemoveTodo(todo.id)">Remove</button>
  <button (click)="onToggleComplete(todo)">Completed</button>
  </li>
  `
})
export class TodoItemsComponent {
  @Input("todos") todos: Todo[];
  @Output() removed = new EventEmitter<number>();
  @Output() toggled = new EventEmitter<{}>();
  @Output() priority = new EventEmitter<{}>();

  onChangePriority(operation, todo) {
    this.priority.emit({ operation, todo });
  }

  onToggleComplete(todo) {
    this.toggled.emit(todo);
  }

  onRemoveTodo(id) {
    this.removed.emit(id);
  }
}
