import { Server, Socket } from "socket.io";
import { RoomManager } from "../redis/roommanager";

type RoomJoinPayload = {
  roomId: string;
  name: string;
  hostToken?: string;
};

type Participant = {
  socketId: string;
  name: string;
  role: "host" | "guest";
};

type PlaybackState = {
  isPlaying: boolean;
  currentTime: number;
  updatedAt: number;
};

type ChatMessage = {
  id: string;
  name: string;
  text: string;
  createdAt: number;
};

type RoomState = {
  participants: Participant[];
  playback: PlaybackState;
  messages: ChatMessage[];
};

const roomStates = new Map<string, RoomState>();

const getOrCreateRoomState = (roomId: string): RoomState => {
  const existing = roomStates.get(roomId);
  if (existing) {
    return existing;
  }

  const created: RoomState = {
    participants: [],
    playback: {
      isPlaying: false,
      currentTime: 0,
      updatedAt: Date.now(),
    },
    messages: [],
  };

  roomStates.set(roomId, created);
  return created;
};

const removeParticipantFromAllRooms = (socket: Socket) => {
  roomStates.forEach((state, roomId) => {
    const participant = state.participants.find((item) => item.socketId === socket.id);
    if (!participant) {
      return;
    }

    state.participants = state.participants.filter((item) => item.socketId !== socket.id);

    socket.to(roomId).emit("room:user-left", {
      name: participant.name,
    });

    if (state.participants.length === 0) {
      roomStates.delete(roomId);
    }
  });
};

export const registerRoomSocketHandlers = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("room:join", async (payload: RoomJoinPayload) => {
      try {
        const roomId = payload?.roomId?.trim();
        const name = payload?.name?.trim();
        const hostToken = payload?.hostToken?.trim();

        if (!roomId || !name) {
          socket.emit("room:error", {
            message: "roomId and name are required",
          });
          return;
        }

        const roomInfo = await RoomManager.getInfo(roomId);

        if (!roomInfo || Object.keys(roomInfo).length === 0) {
          socket.emit("room:error", {
            message: "Room does not exist",
          });
          return;
        }

        const role: "host" | "guest" =
          hostToken && roomInfo.hostToken && hostToken === roomInfo.hostToken
            ? "host"
            : "guest";

        await RoomManager.join(roomId, name);

        const roomState = getOrCreateRoomState(roomId);

        roomState.participants = roomState.participants.filter(
          (participant) => participant.socketId !== socket.id
        );

        roomState.participants.push({
          socketId: socket.id,
          name,
          role,
        });

        await socket.join(roomId);

        socket.emit("room:state", {
          participants: roomState.participants,
          playback: roomState.playback,
          messages: roomState.messages,
        });

        socket.to(roomId).emit("room:user-joined", {
          name,
        });
      } catch (error) {
        socket.emit("room:error", {
          message: error instanceof Error ? error.message : "Unable to join room",
        });
      }
    });

socket.on("video:change", (payload: { roomId: string; videoId: string }) => {
  try {
    const roomId = payload?.roomId?.trim();
    const videoId = payload?.videoId?.trim();
    if (!roomId || !videoId) return;
    const roomState = roomStates.get(roomId);
    if (!roomState) return;
    const participant = roomState.participants.find((p) => p.socketId === socket.id);
    if (!participant || participant.role !== "host") {
      socket.emit("room:error", { message: "Only host can change video" });
      return;
    }
    roomState.playback = { isPlaying: false, currentTime: 0, updatedAt: Date.now() };
    io.to(roomId).emit("video:changed", { videoId, currentTime: 0, isPlaying: false });
  } catch (error) {
    console.error("video:change error:", error);
  }
});

socket.on("playback:play", (payload: { roomId: string; currentTime: number }) => {
  try {
    const roomId = payload?.roomId?.trim();
    const currentTime = typeof payload?.currentTime === "number" ? payload.currentTime : 0;
    if (!roomId) return;
    const roomState = roomStates.get(roomId);
    if (!roomState) return;
    const participant = roomState.participants.find((p) => p.socketId === socket.id);
    if (!participant || participant.role !== "host") return;
    roomState.playback = { isPlaying: true, currentTime, updatedAt: Date.now() };
    io.to(roomId).emit("playback:changed", { action: "play", currentTime });
  } catch (error) {
    console.error("playback:play error:", error);
  }
});

socket.on("playback:pause", (payload: { roomId: string; currentTime: number }) => {
  try {
    const roomId = payload?.roomId?.trim();
    const currentTime = typeof payload?.currentTime === "number" ? payload.currentTime : 0;
    if (!roomId) return;
    const roomState = roomStates.get(roomId);
    if (!roomState) return;
    const participant = roomState.participants.find((p) => p.socketId === socket.id);
    if (!participant || participant.role !== "host") return;
    roomState.playback = { isPlaying: false, currentTime, updatedAt: Date.now() };
    io.to(roomId).emit("playback:changed", { action: "pause", currentTime });
  } catch (error) {
    console.error("playback:pause error:", error);
  }
});

socket.on("playback:seek", (payload: { roomId: string; currentTime: number }) => {
  try {
    const roomId = payload?.roomId?.trim();
    const currentTime = typeof payload?.currentTime === "number" ? payload.currentTime : 0;
    if (!roomId) return;
    const roomState = roomStates.get(roomId);
    if (!roomState) return;
    const participant = roomState.participants.find((p) => p.socketId === socket.id);
    if (!participant || participant.role !== "host") return;
    roomState.playback.currentTime = currentTime;
    roomState.playback.updatedAt = Date.now();
    io.to(roomId).emit("playback:changed", { action: "seek", currentTime });
  } catch (error) {
    console.error("playback:seek error:", error);
  }
});

socket.on("chat:send", (payload: { roomId: string; text: string; name: string }) => {
  try {
    const roomId = payload?.roomId?.trim();
    const text = payload?.text?.trim();
    const name = payload?.name?.trim();
    if (!roomId || !text || !name) return;
    const roomState = roomStates.get(roomId);
    if (!roomState) return;
    const message: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      name,
      text,
      createdAt: Date.now(),
    };
    roomState.messages.push(message);
    if (roomState.messages.length > 20) {
      roomState.messages = roomState.messages.slice(-20);
    }
    io.to(roomId).emit("chat:new-message", message);
  } catch (error) {
    console.error("chat:send error:", error);
  }
});

socket.on("chat:typing", (payload: { roomId: string; name: string; isTyping: boolean }) => {
  try {
    const roomId = payload?.roomId?.trim();
    const name = payload?.name?.trim();
    const isTyping = typeof payload?.isTyping === "boolean" ? payload.isTyping : false;
    if (!roomId || !name) return;
    socket.to(roomId).emit("chat:typing", { name, isTyping });
  } catch (error) {
    console.error("chat:typing error:", error);
  }
});

socket.on("disconnect", () => {
  removeParticipantFromAllRooms(socket);
});
  });
};

