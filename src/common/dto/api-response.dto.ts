// TODO: create enum class to handle custom message
export enum ApiResponseCustomMessage{
    ARTICLES_NOT_FOUND = 'Could not find article with id:'
}

// TODO: create generic class with T
export class ApiResponse<T> {
    statusCode: number;
    message: string;
    data?: T

    constructor(status: number, message: string, data?: T) {
        this.statusCode = status;
        this.message = message;
        this.data = data;
    }
}