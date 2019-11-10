import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "./todo";

@Component({
  selector: "app-todo-items",
  template: `
    <ul>
      <li *ngFor="let todo of todos">
        <p class="todo-text" [class.completed]="todo.completed">
          {{ todo.text }}
        </p>
        <span class="operators" (click)="onChangePriority('+', todo)">+</span>
        <span class="operators" (click)="onChangePriority('-', todo)">-</span>
        <p class="priority">priority: {{ todo.priority }}</p>

        <button (click)="onRemoveTodo(todo.uid)">Remove</button>
        <button (click)="onToggleComplete(todo)">Completed</button>
      </li>
    </ul>
  `
})
export class TodoItemsComponent {
  // tslint:disable-next-line: no-input-rename
  @Input("todos") todos: Todo<string, boolean, string>[];
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
