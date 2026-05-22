import type { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: string[];

  constructor(statusCode: number, message: string, details?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const notFoundHandler = (_request: Request, response: Response): void => {
  response.status(404).json({
    code: 'NOT_FOUND',
    message: 'Resource not found'
  });
};

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      code: error.statusCode >= 500 ? 'INTERNAL_ERROR' : 'BAD_REQUEST',
      message: error.message,
      details: error.details
    });
    return;
  }

  if (error instanceof Error) {
    response.status(500).json({
      code: 'INTERNAL_ERROR',
      message: error.message
    });
    return;
  }

  response.status(500).json({
    code: 'INTERNAL_ERROR',
    message: 'Unexpected server error'
  });
};
