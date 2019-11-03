import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Todo } from "./todo";

@Component({
  selector: "app-todo-item",
  template: `
    <p class="todo-text" [class.completed]="todoItem.completed">
      {{ todoItem.text }}
    </p>
    <span class="operators" (click)="onChangePriority('+', todoItem)">+</span>
    <span class="operators" (click)="onChangePriority('-', todoItem)">-</span>
    <p class="priority">priority: {{ todoItem.priority }}</p>

    <button (click)="onRemoveTodo(todoItem.id)">Remove</button>
    <button (click)="onToggleComplete(todoItem)">Completed</button>
  `
})
export class TodoItemComponent {
  @Input() todoItem: Todo;
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
