export class Todo {
  _id: number;
  text: string;
  completed: boolean;
  priority: number;

  constructor(_id, text, completed, priority) {
    this._id = _id;
    this.text = text;
    this.completed = completed;
    this.priority = priority;
  }
}
