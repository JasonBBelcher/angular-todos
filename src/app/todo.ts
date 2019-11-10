export class Todo<T, U, V> {
  uid: number;
  text: T;
  completed: U;
  priority: V;

  constructor(text, completed, priority) {
    this.uid = this.genId();
    this.text = text;
    this.completed = completed;
    this.priority = priority;
  }

  genId(): number {
    return Math.random() * 10;
  }
}
