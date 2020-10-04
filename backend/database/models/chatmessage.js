'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatMessage.belongsTo(models.ChatRoom, {
        foreignKey: 'FK_chat_room_id',
        targetKey: 'id'
      });
    }
  };
  ChatMessage.init({
    author: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};