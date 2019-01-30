const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dburl = process.env.DATABASE || 'mongodb://localhost/chat';
mongoose.connect(dburl);

mongoose.connection
  .once('open', () => console.log('Connected to the database'))
  .on('error', err => console.error(err));
