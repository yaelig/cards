const request = require('request');
var fs = require("fs");



class service {
constructor(){
}
add_user()
{
   request({
  url:'http://localhost:64502/api/users/saveUser',
  method: 'POST',
  json: true, body:{"name":"msohe"}
  }
, function(error, response, body){
  console.log(body);
});
}

}
module.exports=service;
