import { ErrorProtocol } from "./ErrorProtocol";

export class AppError extends Error implements ErrorProtocol {
  public readonly error: string | string[];
  public readonly status: number;
  public readonly name = 'AppError';

  constructor(error: string | string[], status: number) {
    super();
    this.error = typeof error === 'string' ? [error] : error;
    this.status = status;
    Error.captureStackTrace(this, AppError);
    Object.setPrototypeOf(AppError, Error);
  }

}
