// TODO: create enum class to handle custom message
export enum ApiResponseCustomMessage{
    ARTICLES_NOT_FOUND = 'Could not find article with id:'
}

// TODO: create generic class with T
export class ApiResponse<T> {
    status: number;
    message: string;
    data?: T

    constructor(status: number, message: string, data?: T) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}