import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { createServer } from 'http'
import cors from 'cors';
import { routes } from './routes'
import { Server } from 'socket.io';

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
  if (error instanceof Error) {
    return res.json({ error: error.message });
  }

  return res.status(500).json({ error: 'Internal server error' });
})

export { serverHttp, io };
