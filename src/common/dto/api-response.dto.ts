// TODO: create enum class to handle custom message
export enum ApiResponseCustomMessage {
  ARTICLES_NOT_FOUND = 'Could not find article with id:',
  ARTICLES_UPDATE = 'Article updated with id:',
  ARTICLES_DELETE = 'Article deleted with id:',
  USERS_NOT_FOUND = 'Could not find user with id:',
  USERS_UPDATE = 'User updated with id:',
  USERS_DELETE = 'User deleted with id:',
}

// TODO: create generic class with T
export class ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;

  constructor(status: number, message: string, data?: T) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }
}
