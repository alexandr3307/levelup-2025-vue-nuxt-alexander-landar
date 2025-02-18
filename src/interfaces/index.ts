export interface ITodoController {
    readonly id: string;
    readonly time: Date;
    date: Date;

    makeCompleted: (todo: any) -> void;
    
}