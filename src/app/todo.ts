export class Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: number;

  constructor(id, text, completed, priority) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.priority = priority;
  }
}
