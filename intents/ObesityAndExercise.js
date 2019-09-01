yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right']
noPhrases=['no','nope','nah','not']
// function obesityAndExercise_yes(gotExercise,gotObesity,agent){
//   if (gotExercise && !gotObesity){
//     gotObesity=true;
//     this.agent.req.body.queryResult.parameters['obesity']='obesity'
//     return 'you are fat'
//   }else if(!gotExercise && gotObesity){
//     gotExercise=true;
//     this.agent.req.body.queryResult.parameters['exercise']='exercise'
//     return 'you exercise '
//   }else return 'ahaha'
//  }

// function obesityAndExercise_no(gotExercise,gotObesity,agent){
//   if (gotExercise && !gotObesity){
//     gotObesity=true;
//     this.agent.req.body.queryResult.parameters['obesity']='false'
//   }else if(!gotExercise && gotObesity){
//     gotExercise=true;
//     this.agent.req.body.queryResult.parameters['exercise']='false'
//   }
// }
class ObesityAndExercise{
  constructor(agent){
    this.agent=agent;
     }
  
     foo() {
      const exercise=this.agent.parameters['exercise'];
      const obesity=this.agent.parameters['obesity'];

      let gotExercise=exercise.length>0;
      let gotObesity=obesity.length>0;

    //  if(yesPhrases.includes(this.agent.req.body.queryResult.queryText)){
    //   return this.obesityAndExercise_yes(gotExercise,gotObesity,agent)
    //  }else if(noPhrases.includes(this.agent.req.body.queryResult.queryText)){
    //    this.obesityAndExercise_no(gotExercise,gotObesity,agent)
    //  }
     console.log('this.agent.queryResult '+this.agent)

      if(gotExercise&&gotObesity){
        return 'Ok thanks for that, say drugs if you take any drugs regularly'
      }
      else if (gotExercise && !gotObesity) {
        return 'I am glad you exercise, do you suffer from obesity?'
    } else if (gotObesity && !gotExercise) {
     return 'I see, do you exercise? ';
    } else {
      return 'I would like to know about your exercise habits';
    }
  }

}
 module.exports=ObesityAndExercise