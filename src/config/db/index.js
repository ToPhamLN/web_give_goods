const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully!!!');
  } catch (error) {
    console.log('Connect database failure!!!');
  }
}

module.exports = {connect};
