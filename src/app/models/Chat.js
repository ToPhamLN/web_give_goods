const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Chat = new Schema(
  {
    chatName: {
      type: String,
      required: [true, 'chatName is required field'],
      maxlength: 200,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// User.plugin(mongooseDelete, {
//   overrideMethods: true,
//   deletedAt : true,
// });

module.exports = mongoose.model('Chat', Chat);
