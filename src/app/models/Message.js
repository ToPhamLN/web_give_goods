const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Message = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      trim: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
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

module.exports = mongoose.model('Message', Message);
