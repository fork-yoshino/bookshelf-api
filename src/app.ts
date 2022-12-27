import express, { NextFunction, Request, Response } from 'express';

import apiRoutes from './routes';
import './helpers/db';

const PORT = process.env.PORT ?? '3000';

const app = express();
app.use(express.json());

// Routing
app.use('/api', apiRoutes);
app.use((req, res) => {
  res.status(404).json({ msg: 'Page Not Found' });
});

// エラーハンドラ
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(500).json({ msg: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server start: http://localhost:${PORT}`);
});
