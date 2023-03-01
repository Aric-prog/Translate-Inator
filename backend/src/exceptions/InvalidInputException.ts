export default class NotFoundException extends Error {
    public readonly statusCode: number = 422;
}
