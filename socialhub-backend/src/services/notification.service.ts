import { getIO, getOnlineUsers } from "../socket";

export const sendNotification = (
  userId: string,
  payload: {
    type: string;
    message: string;
  }
) => {
  const onlineUsers = getOnlineUsers();
  const socketId = onlineUsers.get(userId);

  if (socketId) {
    getIO().to(socketId).emit("notification", payload);
  }
};
