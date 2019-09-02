
const request = require('request');


class service {
constructor(){}
add_personal_details(name,age,gender)
{
   request({
  url:'http://localhost:64502/api/personDetails/savePersonDetails',
  method: 'POST',
  json: true, body: {name,age,gender}
  }
, function(error, response, body){
  console.log(body);
});
}
add_genFeel(idPerson,describe)
{
   request({
  url:'http://localhost:64502/api/GeneralFeeling/saveGenFeel',
  method: 'POST',
  json: true, body: {idPerson,describe}
  }
, function(error, response, body){
  console.log(body);
});
}
add_oao(idPerson,Exercise,obesity,ExerciseOften,dateExercise)
{
   request({
  url:'http://localhost:64502/api/oae/saveOae',
  method: 'POST',
  json: true, body:{idPerson,Exercise,obesity,ExerciseOften,dateExercise}
}
, function(error, response, body){
  console.log(body);
});
}
add_smoking(idPerson,brand,isSmoking,often,amountType)
{
  request({
    url:'http://localhost:64502/api/smoking/saveSmoking',
    method: 'POST',
    json: true, body:{idPerson,brand,isSmoking,often,amountType}
  }
  , function(error, response, body){
    console.log(body);
  });
}
add_drugs(idPerson,nameDrug,isDrugs)
{
  request({
    url:'http://localhost:64502/api/smoking/saveSmoking',
    method: 'POST',
    json: true, body:{idPerson,nameDrug,isDrugs}
  }
  , function(error, response, body){
    console.log(body);
  });
}
}
module.exports=service;
