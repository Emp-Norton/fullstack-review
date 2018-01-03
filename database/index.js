'use strict'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function callback () {
  console.log('connection open')
});

let repoSchema = mongoose.Schema({ // able to do partial instantiation? I.e. missing fields
  id: Number,
  owner: String,
  name: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

// let save = (err, data) => { // why does this work even when commented? Native method?
//   if (err){
// 	console.log('failed to save ', data)
//   }
// }

module.exports.Repo = Repo;
//module.exports.save = save;