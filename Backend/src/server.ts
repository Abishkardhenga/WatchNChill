import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectRedis } from './redis/redisConfig';
import userRouter from './routes/user.routes';
import { registerRoomSocketHandlers } from './socket/room.socket';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "*"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
const PORT = Number(process.env.PORT) || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/user', userRouter);

registerRoomSocketHandlers(io);

async function startServer() {
    await connectRedis(); // Connect first
  httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Then handle traffic
}
startServer();
