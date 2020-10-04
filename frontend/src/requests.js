const axios = require("axios");
export const getChatRooms = () => axios.get(`/chatroom/chatrooms`);
export const getChatRoomMessages = (chatRoomName) =>
  axios.get(`/chatroom/chatroom/messages/${chatRoomName}`);
export const joinRoom = (room) => axios.post(`/chatroom/chatroom`, { room });
