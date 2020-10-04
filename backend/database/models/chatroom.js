'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatRoom.hasMany(models.ChatMessage, {
        foreignKey: "FK_chat_room_id",
        sourceKey: "id",
      });
    }
  };
  ChatRoom.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};