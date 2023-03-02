export default class InvalidInputException extends Error {
    public readonly statusCode: number = 422;
}
