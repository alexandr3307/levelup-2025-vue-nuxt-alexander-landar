export class TodoVO {
  static fromString(json: any) {
    return new TodoVO(json.id, json.text, json.createdAt, json.isCompleted);
  }
  static toJSON(todo: TodoVO): string {
    return JSON.stringify({
      id: todo.id,
      text: todo.text,
      createdAt: todo.createdAt,
      isCompleted: todo.isCompleted,
    });
  }
  constructor(
        private _id: string,
        public text: string,
        private _createdAt: Date,
        public isCompleted: boolean = false,
  ) {}
  get createdAt() {
    return this._createdAt;
  }
  get id() {
    return this._id;
  }
}