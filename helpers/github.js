'use strict' // any way to generalize this across all files?
const request = require('request');
const config = require('../config.js');
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
     
      responseArray.forEach(r =>{
        var repoData = new db.Repo({
          id: `${r.id}`,
          owner: `${r.owner.login}`,
          name: `${r.name}`,
          url: `${r.url}`,
          created: `${r.created_at}`
        })
        
        repoData.save(function(err, data){
          console.log('saved ', data.id + ' ' + data.name)
        })

      })
    }
  });

}


module.exports.getReposByUsername = getReposByUsername;