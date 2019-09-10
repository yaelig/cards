yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right']
noPhrases=['no','nope','nah','not']
var  traum=false;
var bloodP=false;
var feel=false;
var enter_yn=false;
var data, stringData='';
class generalFeeling{ 
  constructor(){
     }
  blood_trauma_feel_yes(gottrauma,gotbloodPressure,gotfeeling)
    {     console.log("yesssssss")
    console.log(traum,feel,bloodP)
        if (traum){
        agent.parameters['trauma']='trauma'
        traum=false;
        
      }else if(feel){
      
        agent.parameters['feeling']='feel'
       feel=false;
      }
      else if(bloodP){
        agent.parameters['bloodPressure']='bloodPressure'
        bloodP=false;
      }
    }
    
  blood_trauma_feel_no(gottrauma,gotbloodPressure,gotfeeling)
  {  
    console.log("nooo")
    console.log(traum,feel,bloodP)
      if (traum){
      agent.parameters['trauma']='no trauma'
      traum=false;
      
    }else if(feel){
    
      agent.parameters['feeling']='feel good'
     feel=false;
    }
    else if(bloodP){
      agent.parameters['bloodPressure']='good bloodPressure'
      bloodP=false;
    }
  }
    foo(agent,conv) {
   
      let feeling=agent.parameters.feeling;
      let bloodPressure=agent.parameters.bloodPressure
      let trauma=agent.parameters.trauma;
      let no_bloodPressure=agent.parameters.no_bloodPressure
      let no_trauma=agent.parameters.no_trauma;
  
      conv.user.storage.feeling=(feeling!=''&&feeling!=undefined&&conv.user.storage.feeling==undefined)?feeling:conv.user.storage.feeling;
      conv.user.storage.bloodPressure=(bloodPressure!=''&&bloodPressure!=undefined&&conv.user.storage.bloodPressure==undefined)?bloodPressure:conv.user.storage.bloodPressure;
      conv.user.storage.bloodPressure=(no_bloodPressure!=''&&no_bloodPressure!=undefined)?"no":conv.user.storage.bloodPressure;
      conv.user.storage.trauma=(trauma!=''&&trauma!=undefined&&conv.user.storage.trauma==undefined)?trauma:conv.user.storage.trauma;
      conv.user.storage.trauma=(no_trauma!=''&&no_trauma!=undefined)?"no":conv.user.storage.trauma;
 
     const gotfeeling = conv.user.storage.feeling==undefined?0:1
     const gotbloodPressure = conv.user.storage.bloodPressure==undefined?0:1
     const gottrauma =conv.user.storage.trauma==undefined?0:1

 
    
    console.log("feeling bloodpressure trauma "+feeling+ ' '+bloodPressure+" "+trauma )
    console.log("stor " +JSON.stringify(conv.user.storage))

    if(yesPhrases.includes(agent.query)){
      console.log("yes");
      enter_yn=true;
         this.blood_trauma_feel_yes(gottrauma,gotbloodPressure,gotfeeling)
         console.log(traum,feel,bloodP,enter_yn)
    }
    else if(noPhrases.includes(agent.query)){
         enter_yn=true;
         this.blood_trauma_feel_no(gottrauma,gotbloodPressure,gotfeeling)

    }   
    
    if(gottrauma && gotbloodPressure && gotfeeling){
          return 'Alright, lets move on to some information about diseases history of yours if there is any'
    }
     else if(!gottrauma && !gotbloodPressure && !gotfeeling ){
        return `Ok ${conv.user.storage.name}, Please describe you'r general feeling to me. things like your blood pressure level, a traume you've experienced and generly about how you feel right now`;
      }
      else  if(gottrauma && !gotbloodPressure && gotfeeling ){
        return `That's hard for me to hear i hope you will feel good soon, have you tested you'r blood pressure lately? tell me about it`;
      }   
    else if(gottrauma && !gotbloodPressure && !gotfeeling ){
        bloodP=true;
      return `Ok, have you tested yout blood pressure lately? if not just tell me if it's higher than normal`;
    }
   else  if(gottrauma && gotbloodPressure && !gotfeeling ){
    console.log("feel")
     return `Well, how are you feeling today?`;
    }
    else if( !gottrauma && gotbloodPressure && !gotfeeling ){
      console.log("trauma") 
         return `fine!,Have you been traumatized lately?,if you did what was the trauma?`;
    }
    else if( !gottrauma && gotbloodPressure && gotfeeling ){
         return `Have you been traumatized lately?,if you did what was the trauma?`;
    }
    else if( !gottrauma && !gotbloodPressure && gotfeeling ){
      console.log("trauma3")
       return `Have you been traumatized lately?,if you did what was the trauma?`;
    }
    else  if( gottrauma && !gotbloodPressure && gotfeeling ){
      console.log("blood2")
    return `feel good !, do you suffer from high blood pressure ?,if you don't know just tell me if it's higher than usual ?`;
    }else
      {return `can you repeat that please`;
  }
}
getData(){
  console.log("data of general feeling:  ");
    return data;
}
getQuery(){
  return stringData;
}
}
module.exports=generalFeeling