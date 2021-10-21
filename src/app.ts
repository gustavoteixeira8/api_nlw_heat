import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { createServer } from 'http'
import cors from 'cors';
import { routes } from './routes'
import { Server } from 'socket.io';
import { AppError } from './errors/AppError';

const app = express();
const serverHttp = createServer(app);
const io = new Server(serverHttp, { cors: { origin: '*' }});

io.on('connection',(socket) => {
  console.log(`User connected with id => ${socket.id}`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);


  if (error instanceof AppError) {
    return res.status(error.status).json({ error: error.error, status: error.status });
  }

  return res.status(500).json({ error: 'Internal server error', status: 500 });
})

export { serverHttp, io };
