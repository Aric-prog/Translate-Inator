export default class DatabaseException extends Error {
    public readonly statusCode: number = 400;
    constructor(message: string) {
        super();
        this.message = message;
    }
}
