const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not'];
class ObesityAndExercise{
  constructor(agent){
    this.agent=agent;
     }
     
     obesityAndExercise_no(gotExercise,gotObesity){
      if (gotExercise && !gotObesity){
        gotObesity=true;
        this.agent.parameters['obesity']='false'
      }else if(!gotExercise && gotObesity){
        gotExercise=true;
        this.agent.parameters['exercise']='false'
      }
     }
    obesityAndExercise_yes(gotExercise,gotObesity){
  if (gotExercise && !gotObesity){
    gotObesity=true;
    this.agent.parameters['obesity']='obesity'
  //  return 'you are fat'
  }else if(!gotExercise && gotObesity){
    gotExercise=true;
    this.agent.parameters['exercise']='exercise'
  //  return 'you exercise cool!!'
  }
 }

     foo() {
       console.log('this.agent.query  ' +this.agent.query)
      const exercise=this.agent.parameters['exercise'];
      const obesity=this.agent.parameters['obesity'];

      const no_exercise=this.agent.parameters.exercise.no_exercise;
      const no_obesity=this.agent.parameters.obesity.no_obesity;
      
      if(no_exercise.length>0){
        exercise='false';
      }
      if(no_obesity.length>0){
        obesity='false';
      }

      let gotExercise=exercise.length>0;
      let gotObesity=obesity.length>0;

     if(yesPhrases.includes(this.agent.query)){
       this.obesityAndExercise_yes(gotExercise,gotObesity)
     }else if(noPhrases.includes(this.agent.query)){
       this.obesityAndExercise_no(gotExercise,gotObesity)
     }

      if(gotExercise&&gotObesity){
        this.add_oae()
        return 'Ok thanks for that, say drugs if you take any drugs regularly';
      }
      else if (gotExercise && !gotObesity) {
        return 'I am glad you exercise, do you suffer from obesity?';
    } else if (gotObesity && !gotExercise) {
     return 'I see, do you exercise? ';
    } else {
      return 'I would like to know about your exercise habits';
    }
  }
  add_oae(idPerson,Exercise,obesity,ExerciseOften,dateExercise)
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

}
 module.exports=ObesityAndExercise