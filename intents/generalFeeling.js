yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right']
noPhrases=['no','nope','nah','not','not at all']
class generalFeeling{ 
  constructor(){
     }
    foo(agent,conv){
 
      let feeling=agent.parameters.feeling;
     // let bloodPressureLevel=(agent.parameters.bloodPressureLevel.diastolic-bloodPressure==undefined)?agent.parameters.bloodPressureLevel:agent.parameters.bloodPressureLevel.diastolic-bloodPressure+"/"+agent.parameters.bloodPressureLevel.diastolic-bloodPressure
      const bloodPressure=agent.parameters.bloodPressure//||bloodPressureLevel
      const trauma=agent.parameters.trauma;
      const no_bloodPressure=agent.parameters.no_bloodPressure
      const no_trauma=agent.parameters.no_trauma;
  
      //add here not required entities in exact same way 
      conv.data.feeling=(feeling!=''&&feeling!=undefined&&conv.data.feeling==undefined)?feeling:conv.data.feeling;
      conv.data.bloodPressure=(bloodPressure!=''&&bloodPressure!=undefined&&conv.data.bloodPressure==undefined)?bloodPressure:conv.data.bloodPressure;
      conv.data.bloodPressure=(no_bloodPressure!=''&&no_bloodPressure!=undefined)?"no":conv.data.bloodPressure;
      conv.data.trauma=(trauma!=''&&trauma!=undefined&&conv.data.trauma==undefined)?trauma:conv.data.trauma;
      conv.data.trauma=(no_trauma!=''&&no_trauma!=undefined)?"no":conv.data.trauma;
 
     let gotfeeling = conv.data.feeling==undefined?0:1
     let gotbloodPressure = conv.data.bloodPressure==undefined?0:1
     let gottrauma =conv.data.trauma==undefined?0:1

    console.log("feeling bloodpressure trauma "+feeling+ ' '+bloodPressure+" "+trauma )
    console.log("stor " +JSON.stringify(conv.data))
     
    function blood_trauma_feel_yes()
    {     console.log("yesssssss")
    if (gotbloodPressure && !gottrauma){
      conv.data.gottrauma='traumatized';
      gottrauma=true;
    }else if(!gotbloodPressure && gottrauma){
       conv.data.gotbloodPressure='high-not specified';
       gotbloodPressure=true;
    }
    }
    
   function blood_trauma_feel_no()
   {
    if (gotbloodPressure && !gottrauma){
      conv.data.gottrauma='no';
      gottrauma=true;
    }else if(!gotbloodPressure && gottrauma){
       conv.data.gotbloodPressure='no';
       gotbloodPressure=true;
    }
   }

    if(yesPhrases.includes(agent.query)){
       blood_trauma_feel_yes()
    }
    else if(noPhrases.includes(agent.query)){
         blood_trauma_feel_no()
    }   
    
    if(gottrauma && gotbloodPressure && gotfeeling){
      conv.data.feeling=feelingString;
          return 'Alright, I need some information about your medical history please'
    }
     else if(!gottrauma && !gotbloodPressure && !gotfeeling ){
        return `Ok ${conv.data.name}, Please describe you'r general feeling to me. things like your blood pressure level, a traume you've experienced and generly about how you feel right now`;
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
         return `Fine!, Have you been traumatized lately? if you did what was the trauma?`;
    }
    else if( !gottrauma && gotbloodPressure && gotfeeling ){
         return `Have you been traumatized lately? if you did what was the trauma?`;
    }
    else if( !gottrauma && !gotbloodPressure && gotfeeling ){
       return `Have you been traumatized lately? if you did what was the trauma?`;
    }
    else  if( gottrauma && !gotbloodPressure && gotfeeling ){
      console.log("blood2")
    return `Feel good!, Is your blood pressure higher than ususal? if it is, can you tell me how much it is?`;
    }
  }
}
module.exports=generalFeeling