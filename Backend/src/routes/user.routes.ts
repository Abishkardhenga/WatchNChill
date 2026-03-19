import { Router } from "express";
import { createRoom, JoinRoom } from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/create-room", createRoom);
userRouter.post("/join-room", JoinRoom);

export default userRouter;
