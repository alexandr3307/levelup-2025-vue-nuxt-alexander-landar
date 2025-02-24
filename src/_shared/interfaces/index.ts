export interface ITodoController {
    readonly id: string;
    readonly time: Date;
  
    makeCompleted: (todo: any) => void;
  }