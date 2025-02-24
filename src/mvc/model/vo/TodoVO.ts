class TodoVO {
  static fromRaw(raw: string | null): TodoVO | undefined {
    const json = JSON.parse(raw ?? '""');
    if (!json) { return undefined; }
    return new TodoVO(
      json.id,
      json.text,
      new Date(json.createdAt),
      json.isCompleted,
    );
  }
  
  static toJSON(todo: TodoVO): string {
    return JSON.stringify({
      id: todo.id,
      text: todo.text,
      createdAt: todo.createdAt.toUTCString(),
      isCompleted: todo.isCompleted,
    });
  }
  
  constructor(
      public id: string,
      public text: string,
      public createdAt: Date,
      public isCompleted: boolean = false,
  ) {
  }
}
  
export default TodoVO;