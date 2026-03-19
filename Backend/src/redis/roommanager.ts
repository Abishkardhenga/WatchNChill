import redisClient from './redisConfig';

export class RoomManager {
    /**
     * Helper to generate consistent keys
     */
    private static keys = {
        meta: (id: string) => `room:${id}:meta`,
        users: (id: string) => `room:${id}:users`,
    };

    /**
     * Create a new room with metadata and an initial creator
     */
    static async create(roomId: string, creatorId: string, name: string, hostToken: string) {
        const metaKey = this.keys.meta(roomId);
        const userKey = this.keys.users(roomId);

        // 1. Store the Room Info (Name, Creator, etc.)
        await redisClient.hSet(metaKey, {
            name,
            creator: creatorId,
            hostToken,
            status: "active",
            createdAt: Date.now().toString(),
        });

        // 2. Add the creator to the user list
        await redisClient.sAdd(userKey, creatorId);

        // 3. Set Expiry (e.g., 24 hours) to prevent memory leaks
        await redisClient.expire(metaKey, 86400);
        await redisClient.expire(userKey, 86400);

        return { roomId, name, creatorId, hostToken };
    }

    /**
     * Add a user to an existing room
     */
    static async join(roomId: string, userId: string) {
        // First check if the room actually exists
        const exists = await redisClient.exists(this.keys.meta(roomId));
        if (!exists) throw new Error("Room does not exist");

        await redisClient.sAdd(this.keys.users(roomId), userId);
        return { success: true };
    }

    /**
     * Remove a user from a room
     */
    static async leave(roomId: string, userId: string) {
        await redisClient.sRem(this.keys.users(roomId), userId);
        
        // Optional: If room is empty, you could delete the metadata too
        const count = await redisClient.sCard(this.keys.users(roomId));
        if (count === 0) {
            await redisClient.del(this.keys.meta(roomId));
        }
        
        return { success: true };
    }

    /**
     * Get all users currently in the room
     */
    static async getMembers(roomId: string) {
        return await redisClient.sMembers(this.keys.users(roomId));
    }

    /**
     * Get details about the room (Name, Creator, etc.)
     */
    static async getInfo(roomId: string) {
        return await redisClient.hGetAll(this.keys.meta(roomId));
    }
}