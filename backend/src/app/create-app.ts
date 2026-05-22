import cors from 'cors';
import express from 'express';
import { initializeDatabase } from '../db/sqlite.js';
import { errorHandler, notFoundHandler } from '../middlewares/error-handler.js';
import { taskRouter } from '../routes/task.routes.js';

export const createApp = () => {
  initializeDatabase();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_request, response) => {
    response.status(200).json({ status: 'ok' });
  });

  app.use('/api/v1/tasks', taskRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
