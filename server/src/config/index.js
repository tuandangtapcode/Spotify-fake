const moongoose = require('mongoose');

async function connect() {

  try {
    await moongoose.connect('mongodb://127.0.0.1:27017/spotify', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connect successfully!!');
  } catch (error) {
    console.log('Connect failures!!');
  }

}

module.exports = { connect };
