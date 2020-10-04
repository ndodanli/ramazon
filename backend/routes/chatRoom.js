const express = require("express");
const models = require("../database/models");
const router = express.Router(); /* GET users listing. */
router.get("/chatrooms", async (req, res, next) => {
  console.log('chatrooms TEST')
  const chatRooms = await models.ChatRoom.findAll();
  res.send(chatRooms);
});
router.post("/chatroom", async (req, res, next) => {
  console.log('TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
  console.log('req.body.room', req.body.room)
  const room = req.body.room;
  const chatRooms = await models.ChatRoom.findAll({
    where: { name: room },
  }); 
  const chatRoom = chatRooms[0];
  if (!chatRoom) { 
    await models.ChatRoom.create({ name: room });
  }
  res.send(chatRooms);
});
router.get("/chatroom/messages/:chatRoomName", async (req, res, next) => {
  try {
    const chatRoomName = req.params.chatRoomName;
    const chatRooms = await models.ChatRoom.findAll({
      where: {
        name: chatRoomName,
      },
    });
    const chatRoomId = chatRooms[0].id;
    const messages = await models.ChatMessage.findAll({
      where: {
        FK_chat_room_id: chatRoomId,
      },
    }); 
    res.send(messages);
  } catch (error) {
    res.send([]);
  }
});
module.exports = router;
