	'use strict'

const express = require('express');
const helper = require('../helpers/github')
const db = require('../database/index');
const parser = require('body-parser');
let app = express();



app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.urlencoded({ extended: false }))
//app.use(parser.json());

app.post('/repos', function (req, res) {
	console.log('serving POST for ', req.url)
	var username = req.body.uname;
	console.log(req.body.uname)
	helper.getReposByUsername(username);
	res.end('data added to DB');
})

app.get('/repos', function (req, res) {

	// TODO: 
	// Limit to 25 responses 
	// implement an ordering schema 
	// render on the actual page
	console.log('serving GET for ', req.url)
	db.Repo.find(function(err, data){
		var repos = data; // this is an array of ALL entries in DB. 
	
	    var sorted = repos.sort(function(a, b){
	    	return a.id - b.id // why doesn't this work for ID or Created_at?
	    })

		console.log(repos.length)
		res.end('');
	})
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

