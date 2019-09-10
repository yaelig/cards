const app=require('..')
const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not'];
var data,stringData='';
var gotExercise,gotObesity
class ObesityAndExercise{
  constructor(){
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
       
      stringData+=this.agent.query+" ";
      const exercise=this.agent.parameters['exercise'];
      const obesity=this.agent.parameters['obesity'];
 
      const no_exercise=this.agent.parameters.exercise=='no_exercise'?true:false;
      const no_obesity=this.agent.parameters.obesity=='no_obesity'?true:false;

      if(no_exercise.length>0){
        exercise='false';
      }
      if(no_obesity.length>0){
        obesity='false';
      }
        gotExercise=exercise.length>0;
        gotObesity=obesity.length>0;

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
        return 'Ok thanks for that, Do you take any drugs regularly? please detail';
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
  getQuery(){
    return stringData;
  }

}
 module.exports=ObesityAndExercise