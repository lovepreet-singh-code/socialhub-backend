import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io: Server;

const onlineUsers = new Map<string, string>(); // userId -> socketId

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { userId: string };

      socket.data.userId = decoded.userId;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId;
    onlineUsers.set(userId, socket.id);

    console.log("🟢 User connected:", userId);

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      console.log("🔴 User disconnected:", userId);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

export const getOnlineUsers = () => onlineUsers;
