import { Request, Response } from "express";
import { generateRoomId, generateHostToken } from "../utilis/utilis";
import { RoomManager } from "../redis/roommanager";

enum UserRoleType {
    Host = "Host",
    Guest = "Guest"
}
enum isVideoPlayingType {
    true = "true",
    false = "false"
}

const createRoom = async (req: Request, res: Response) => {
    const body = req.body ?? {};
    const roomname = typeof body.roomname === "string" ? body.roomname.trim() : "";
    const username = typeof body.username === "string" ? body.username.trim() : "";


    try {
        if (!roomname || !username) {
            return res.status(400).json({ message: "Room name and username are required" });
        }

        if (roomname.length < 3 || roomname.length > 30) {
            return res.status(400).json({ message: "Room name must be between 3 and 30 characters" });
        }

        if (username.length < 3 || username.length > 30) {
            return res.status(400).json({ message: "Username must be between 3 and 30 characters" });
        }

        const roomId = generateRoomId();
        const hostToken = generateHostToken();

        await RoomManager.create(roomId, username, roomname, hostToken);

        return res.status(201).json({
            message: "Room created succesfully ",
            roomId,
            hostToken,
            user: {
                name: username,
                role: UserRoleType.Host
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating room", error });
    }
};

const JoinRoom = async (req: Request, res: Response) => {
    const body = req.body ?? {};
    const roomId = typeof body.roomId === "string" ? body.roomId.trim() : "";
    const username = typeof body.username === "string" ? body.username.trim() : "";

    try {
        if (!roomId || !username) {
            return res.status(400).json({ message: "Room ID and username are required" });
        }

        if (username.length < 3 || username.length > 30) {
            return res.status(400).json({ message: "Username must be between 3 and 30 characters" });
        }

        await RoomManager.join(roomId, username);

        return res.status(200).json({
            message: "Joined room successfully",
            roomId,
            user: {
                name: username,
                role: UserRoleType.Guest
            },
            playback: {
                videoId: "null",
                isPlaying: isVideoPlayingType.false,
                currentTime: "0"
            },
            messages:[]
        });
    } catch (error) {
        if (error instanceof Error && error.message === "Room does not exist") {
            return res.status(404).json({ message: "Room does not exist" });
        }

        return res.status(500).json({ message: "Error joining room", error });
    }
};

export { createRoom, JoinRoom };