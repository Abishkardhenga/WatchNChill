const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export interface CreateRoomResponse {
  message: string;
  roomId: string;
  hostToken: string;
  user: {
    name: string;
    role: string;
  };
}

export interface JoinRoomResponse {
  message: string;
  roomId: string;
  user: {
    name: string;
    role: string;
  };
}

export const createRoom = async (
  roomname: string,
  username: string
): Promise<CreateRoomResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/user/create-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomname, username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create room");
  }

  return response.json();
};

export const joinRoom = async (
  roomId: string,
  username: string
): Promise<JoinRoomResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/user/join-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomId, username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to join room");
  }

  return response.json();
};
