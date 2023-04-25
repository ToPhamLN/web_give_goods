const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
// const mongooseDelete = require('mongoose-delete');

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
      required: true,
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
    slug: {
      type: String,
    },
    // slug: {
    //     type: String,
    //     slug: ["title", "description"],
    //     unique: true,
    // }
  },
  {timestamps: true}
);

//Add plugin
// mongoose.plugin(slug);
// Blog.plugin(mongooseDelete, {
//     overrideMethods: true,
//     deletedAt : true,
// });

module.exports = mongoose.model('Blog', Blog);
