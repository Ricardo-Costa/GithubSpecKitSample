const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

interface ApiErrorResponse {
  code?: string;
  message?: string;
  details?: string[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly details?: string[]
  ) {
    super(message);
  }
}

export const request = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {})
    },
    ...options
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = (await response.json()) as T | ApiErrorResponse;

  if (!response.ok) {
    const errorBody = body as ApiErrorResponse;
    throw new ApiError(
      errorBody.message ?? 'Unexpected API error',
      response.status,
      errorBody.details
    );
  }

  return body as T;
};
