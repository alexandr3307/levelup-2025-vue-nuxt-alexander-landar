export class TodoVO {
    constructor(
        private _id: string,
        public text: string,
        private _createdAt: Date,
        public isCompleted: boolean,
    ) {}
    get createAt() {
        return this._createdAt
    }
    get id() {
        return this._id
    }
}