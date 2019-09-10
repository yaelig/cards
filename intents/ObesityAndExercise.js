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
         agent.parameters['obesity']='false'
      }else if(!gotExercise && gotObesity){
         agent.parameters['exercise']='false'
         gotExercise=  agent.parameters.exercise=='false'?true:false
          console.log('no exerciseeeee')
      }
     }
    obesityAndExercise_yes(gotExercise,gotObesity){
  if (gotExercise && !gotObesity){
    gotObesity=true;
     agent.parameters['obesity']='obesity'
  //  return 'you are fat'
  }else if(!gotExercise && gotObesity){
    gotExercise=true;
     agent.parameters['exercise']='exercise'
  //  return 'you exercise cool!!'
  }
 }

     foo(agent,conv) {     
       
      stringData+= agent.query+" ";
     //declaretion on parameters, positive and negative
      const exercise=agent.parameters.exercise;
      const obesity=agent.parameters.obesity;

      const no_exercise= agent.parameters.no_exercise;
      const no_obesity= agent.parameters.no_obesity;

        //---------------------------------------------------------------
console.log("obesity exercise "+obesity+ ' '+exercise)
conv.user.storage.exercise=(exercise!=''&&exercise!=undefined&&conv.user.storage.exercise==undefined)?exercise:conv.user.storage.exercise;
conv.user.storage.exercise=(no_exercise!=''&&no_exercise!=undefined)?"no":conv.user.storage.exercise;

conv.user.storage.obesity=(obesity!=''&&obesity!=undefined&&conv.user.storage.obesity==undefined)?obesity:conv.user.storage.obesity;
conv.user.storage.obesity=(no_obesity!=''&&no_obesity!=undefined)?"no":conv.user.storage.obesity;
console.log("exercise " +JSON.stringify(conv.user.storage))


const gotExercise = conv.user.storage.exercise==undefined?0:1
const gotObesity = conv.user.storage.obesity==undefined?0:1

console.log("gotObesity and exercise "+gotExercise+" " +gotObesity)

     if(yesPhrases.includes( agent.query)){
      console.log("got obesity and gotexercise before function: "+gotObesity+" " +gotExercise)
        obesityAndExercise_yes(gotExercise,gotObesity)
       console.log("got obesity and gotexercise after function: "+gotObesity+" " +gotExercise)
     }
     else 
     if(noPhrases.includes( agent.query)){
      console.log("got obesity and gotexercise before function: "+gotObesity+" " +gotExercise)
        obesityAndExercise_no(gotExercise,gotObesity)
       console.log("got obesity and gotexercise after function: "+gotObesity+" " +gotExercise)
     }

      if(gotExercise&&gotObesity){
       //  add_oae()
      data= agent.parameters;
        return 'Ok thanks for that, Do you take any drugs regularly? please detail';
      }
      else 
      if (gotExercise && !gotObesity) {
        return 'I am glad you exercise, do you suffer from obesity?';
    }
    else 
    if (gotObesity && !gotExercise) {
     return 'I see, do you exercise? ';
    }
    else 
   {
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