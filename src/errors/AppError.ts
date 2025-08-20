
export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Restore prototype chain
    Object.setPrototypeOf(this, AppError.prototype);

    // Optional: capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
