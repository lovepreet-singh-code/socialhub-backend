import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: "PASTE_YOUR_JWT_TOKEN_HERE",
  },
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("notification", (data) => {
  console.log("🔔 Notification:", data);
});
