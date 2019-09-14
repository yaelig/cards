module.exports=function(userId,name,form){
  console.log("add user userId and name : "+userId+" "+name)
     request({
    url:'http://localhost:64502/api/users/saveUser',
    method: 'POST',
    json: true, body:{iduser:userId,name:name,form:form}
    }
  , function(error, response, body){
    console.log(body);
  
  });
};