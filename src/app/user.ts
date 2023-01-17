export class User {
    constructor(public id: number,
                public name: string,
                public email: string,
                public created_at: Date,
                public updated_at: Date,) {
    }
}