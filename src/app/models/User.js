const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      min: 6,
      max: 20,
      unique: false,
      required: true,
    },
    numberPhone: {
      type: String,
      unique: false,
      required: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 20,
      unique: false,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('User', User);
