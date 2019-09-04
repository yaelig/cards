const app=require('../app')
const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not'];
let exercise,obesity,no_exercise,no_obesity;
var data;
class ObesityAndExercise{
  constructor(agent){
    this.agent=agent;
     exercise=this.agent.parameters['exercise'];
     obesity=this.agent.parameters['obesity'];

     no_exercise=this.agent.parameters.exercise=='no_exercise'?true:false;
     no_obesity=this.agent.parameters.obesity=='no_obesity'?true:false;
     }
     obesityAndExercise_no(gotExercise,gotObesity){
      if (gotExercise && !gotObesity){
        gotObesity=true;
        this.agent.parameters['obesity']='false'
      }else if(!gotExercise && gotObesity){
        this.agent.parameters['exercise']='false'
         gotExercise= this.agent.parameters.exercise=='false'?true:false
          console.log('no exerciseeeee')
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
      if(no_exercise.length>0){
        exercise='false';
      }
      if(no_obesity.length>0){
        obesity='false';
      }

       const gotExercise=exercise.length>0;
       const gotObesity=obesity.length>0;

     if(yesPhrases.includes(this.agent.query)){
      console.log("got obesity and gotexercise before function: "+gotObesity+" " +gotExercise)
       this.obesityAndExercise_yes(gotExercise,gotObesity)
       console.log("got obesity and gotexercise after function: "+gotObesity+" " +gotExercise)
     }else if(noPhrases.includes(this.agent.query)){
      console.log("got obesity and gotexercise before function: "+gotObesity+" " +gotExercise)
       this.obesityAndExercise_no(gotExercise,gotObesity)
       console.log("got obesity and gotexercise after function: "+gotObesity+" " +gotExercise)
     }

      if(gotExercise&&gotObesity){
       // this.add_oae()
      data=this.agent.parameters;
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
  getData()
  {
    return data;
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