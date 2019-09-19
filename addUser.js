const request=require('request')
module.exports=function(userId,form,systolic,diastolic){
  score=0;
  if(diastolic!=undefined&&diastolic > 85)
  score += (diastolic - 75) / 10 * 5;
  if(systolic!=undefined&&systolic > 85)
  score += (systolic - 75) / 10 * 5;
  if(form.PersonalDetails.age>40)
  score += (form.PersonalDetails.age- 30) / 10*5;
  if(form.HeartRelatedDiseases.cholesterol=="yes")
  score+=10;
  if(form.HeartRelatedDiseases.diabetes=="yes")
  score+=10;
  if(form.Drugs.drugs[0]!="no")
  score+=10;
  if(form.ObesityAndExercise.exercise=="no")
  score+=10;
  if(form.smokingHabits.SmokingOften!=undefined)
  score+=10;
   name=form.PersonalDetails.name;
  request({
    url:'http://localhost:64502/api/post',
    method: 'POST',
    json: true, body:{userId,name,score}
    }
  , function(error, response, body){
    console.log(body);
  });
}