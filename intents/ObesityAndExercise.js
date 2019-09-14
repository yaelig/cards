const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not'];
module.exports=function(agent,conv) {  
console.log("obesity and exercise ")

      const exercise=agent.parameters.exercise;
      const obesity=agent.parameters.obesity;
      
      const no_exercise= agent.parameters.no_exercise;
      const no_obesity= agent.parameters.no_obesity;

      conv.data.exercise=(exercise!=''&&exercise!=undefined&&conv.data.exercise==undefined)?exercise:conv.data.exercise;
      conv.data.exercise=(no_exercise!=''&&no_exercise!=undefined)?"no":conv.data.exercise;
      
      conv.data.obesity=(obesity!=''&&obesity!=undefined&&conv.data.obesity==undefined)?obesity:conv.data.obesity;
      conv.data.obesity=(no_obesity!=''&&no_obesity!=undefined)?"no":conv.data.obesity;
   
      let gotExercise = conv.data.exercise==undefined?0:1
      let gotObesity = conv.data.obesity==undefined?0:1
      
      function obesityAndExercise_no()
      {
        console.log("obesity no")
        if (gotExercise && !gotObesity){
          conv.data.obesity='no';
          gotObesity=true;
        }else if(!gotExercise && gotObesity){
           conv.data.exercise='no';
           gotExercise=true;
        }else if(gotObesity&&gotExercise){
          console.log("gotObesity&&gotExercise no phrases")
          return 'All right, there is one last thing. Do you smoke?'
        }
        return 'That does not really make sense to me, please try to be more specific'
       }
      function obesityAndExercise_yes()
      {
         if (gotExercise && !gotObesity){
            gotObesity=true;
            conv.data.obesity='yes- not specified'
           }else if(!gotExercise && gotObesity){
             gotExercise=true;
             conv.data.exercise='yes- not specified'
           }else return 'That does not really make sense to me, please try to be more specific'
      }
       
      if(yesPhrases.includes(agent.query)){
          obesityAndExercise_yes()
       }else if(noPhrases.includes(agent.query)){
          obesityAndExercise_no()
       }

      if(gotExercise&&gotObesity){
        return 'Ok thanks for that, Are there any drugs you take regularly? please detail';
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
      return 'Please tell me about your exercise habits';
    }
  }
