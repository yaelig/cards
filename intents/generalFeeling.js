const {dialogflow,Permission,SignIn,actionssdk,Suggestions} = require('actions-on-google')
yesPhrases=['Yes','yes','yeah','yep','yeap','that is true','true','that is right','right']
noPhrases=['No','no','nope','nah','not','not at all','noo','never','you wish','it is not',`it's not`,'its not']
module.exports=function(agent,conv){
    //  feelingString+", "+agent.query+" " 
      // let feeling=agent.parameters.feeling;
      const diastolic_bloodPressure=(agent.parameters.bloodPressureLevel==undefined)?undefined:agent.parameters.bloodPressureLevel.diastolic_bloodPressure;
      const systolic_bloodPressure=(agent.parameters.bloodPressureLevel==undefined)?undefined:agent.parameters.bloodPressureLevel.systolic_bloodPressure;
      let bloodPressureLevel=(diastolic_bloodPressure==undefined)?agent.parameters.bloodPressureLevel:diastolic_bloodPressure+"/"+systolic_bloodPressure
      const bloodPressure=bloodPressureLevel||agent.parameters.bloodPressure;
      // const trauma=agent.parameters.trauma;
      const no_bloodPressure=agent.parameters.no_bloodPressure
      // const no_trauma=agent.parameters.no_trauma;
      console.log("feeling bloodpressure trauma"+ bloodPressure)
      //add here not required entities in exact same way 
      conv.data.diastolic_bloodPressure=(diastolic_bloodPressure!=''&&diastolic_bloodPressure!=undefined&&conv.data.diastolic_bloodPressure==undefined)?diastolic_bloodPressure:conv.data.diastolic_bloodPressure;
      conv.data.systolic_bloodPressure=(systolic_bloodPressure!=''&&systolic_bloodPressure!=undefined&&conv.data.systolic_bloodPressure==undefined)?systolic_bloodPressure:conv.data.systolic_bloodPressure;
      // conv.data.feeling=(feeling!=''&&feeling!=undefined&&conv.data.feeling==undefined)?feeling:conv.data.feeling;
      conv.data.bloodPressure=(bloodPressure!=''&&bloodPressure!=undefined&&conv.data.bloodPressure==undefined)?bloodPressure:conv.data.bloodPressure;
      conv.data.bloodPressure=(no_bloodPressure!=''&&no_bloodPressure!=undefined)?"no":conv.data.bloodPressure;
      // conv.data.trauma=(trauma!=''&&trauma!=undefined&&conv.data.trauma==undefined)?trauma:conv.data.trauma;
      // conv.data.trauma=(no_trauma!=''&&no_trauma!=undefined)?"no":conv.data.trauma;
 
    //  let gotfeeling = conv.data.feeling==undefined?0:1
     let gotbloodPressure = conv.data.bloodPressure==undefined?0:1
    //  let gottrauma =conv.data.trauma==undefined?0:1

    console.log("feeling bloodpressure trauma "+bloodPressure )
    console.log("stor " +JSON.stringify(conv.data))
     
    function blood_trauma_feel_yes()
    {     
      if (!gotbloodPressure){
        conv.data.bloodPressure='yes-not specified';
        gotbloodPressure=true;
      }
    }
    
   function blood_trauma_feel_no()
   {
    if (!gotbloodPressure){
      conv.data.bloodPressure='no-not specified';
      gotbloodPressure=true;
    }
   }
    if(yesPhrases.includes(agent.query)){
       blood_trauma_feel_yes()
    }
    else if(noPhrases.includes(agent.query)){
      console.log("phrases no ")
         blood_trauma_feel_no()
    } 
    console.log("got bp     "+gotbloodPressure)

    if(gotbloodPressure){
      conv.data.currentIntent='diseases';
      conv.data.hrdQ='heart';
      conv.ask(`Alright, I need some information about your medical history please. Do you suffer from any specific heart diseases?`)
      conv.ask(new Suggestions(['No','Yes','My heart is cool','Had a heart attack','Cardiac catheterization']))
      return conv;
    }
    else if(!gotbloodPressure){
      conv.ask('Have you tested your blood pressure lately? Please detail');
      conv.ask(new Suggestions(['High','Very high','Low','Normal','90-134','80/120']))
      return conv;
    }
}
