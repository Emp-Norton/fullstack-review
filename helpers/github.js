'use strict' // any way to generalize this across all files?
const request = require('request');
const config = require('../config.example.js');
const db = require('../database/index');

let getReposByUsername = (username) => {  
 
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, data){
    if (!err){
      var responseArray = JSON.parse(data.body);
      if (responseArray.length){
        responseArray.forEach(r =>{
          var repoData = new db.Repo({
            id: `${r.id}`,
            owner: `${r.owner.login}`,
            forks: `${r.forks}`,
            name: `${r.name}`,
            url: `${r.url}`,
            created: `${r.created_at}`,
            description: `${r.description}` || 'description not available'
          })


          repoData.save(function(err, data){
            if (err){
              console.log('Failed to save')
            } else {
            console.log('saved ', data.id + ' ' + data.name)
            }
          })
        })
      } else {
        console.log('Bad response from Git API - Check the username')
      }
    } else {
      console.log(err)
    }
  });

}


module.exports.getReposByUsername = getReposByUsername;