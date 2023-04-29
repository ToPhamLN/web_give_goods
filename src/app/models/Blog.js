const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    public: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    numberPhone: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    authorID: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('Blog', Blog);
