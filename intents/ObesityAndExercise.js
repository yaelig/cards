const yesPhrases=['Yes','yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['No','no','nope','nah','not'];
const {Suggestions}=require('actions-on-google')
module.exports=function(agent,conv) {  
  conv.data.qls=0;
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
          conv.data.currentIntent='smoking'
        }else if(!gotObesity&&!gotExercise){
          switch(conv.data.oaeQ){
            case 'exercise':
                conv.data.exercise='no- not specified';
                gotExercise=true;
            case 'obesity':
                conv.data.obesity='no- not specified';
                gotObesity=true;
          }
        }
       }
      function obesityAndExercise_yes()
      {
         if (gotExercise && !gotObesity){
            gotObesity=true;
            conv.data.obesity='yes- not specified'
           }
          else if(!gotExercise && gotObesity){
             gotExercise=true;
             conv.data.exercise='yes- not specified'
           }
           else if(!gotObesity&&!gotExercise){
            switch(conv.data.oaeQ){
              case 'exercise':
                  conv.data.exercise='yes -not specified';
                  gotExercise=true;
                  conv.data.oaeQ="obesity"
              case 'obesity':
                  conv.data.obesity='yes- not specified';
                  gotObesity=true;
                  conv.data.oaeQ="exercise"
            }
           }
      }
       
     if(yesPhrases.includes(agent.query)){
          obesityAndExercise_yes()
       }else if(noPhrases.includes(agent.query)){
          obesityAndExercise_no()
       }

      if(gotExercise&&gotObesity){
        console.log("if gotExercise&&gotObesity")
        conv.data.currentIntent='drugs'
        conv.ask('Ok thanks for that, Are there any drugs you take regularly? please detail');
        conv.ask(new Suggestions(['No','Beclomethasone','Hydroxyzine','Triamcinolone','I take some pills']))
        return conv;
      }
      else 
      if (gotExercise && !gotObesity) {
        conv.data.oaeQ="obesity"
        conv.ask('I see okay, do you suffer from obesity?');
        conv.ask(new Suggestions(['Yes','No','I am very skinny','A little','Over weight']))
        return conv;
    }
    else 
    if (gotObesity && !gotExercise) {
      conv.data.oaeQ="exercise"
     conv.ask('I see, do you exercise? ');
     conv.ask(new Suggestions(['no','yes','I go to the gym','I run','I like walking']))
     return conv;
    }
    else
   {
      conv.ask(`Thank's, we'll be finished soon. Please tell me about your exercise habits. Do you exercise at all?`);
      conv.ask(new Suggestions(['I go to the gym','I run sometimes','I like walking','Jogging very often']))
      return conv;
    }
  }
