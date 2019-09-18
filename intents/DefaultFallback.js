const generalFeeling=require('./generalFeeling')
const personalDetails=require('./personalDetails')
const smokingHabits=require('./smokingHabits')
const ObesityAndExercise=require('./ObesityAndExercise')
const HeartRelatedDiseases=require('./HeartRelatedDiseases')
const Drugs=require('./Drugs')
var yesPhrases=['Yes','yea','yes','yeah','yep','yeap','that is true','true','that is right','right'];
var noPhrases=['No','no','nope','nah','not','not at all'];
module.exports=function(agent,conv){
    console.log("default fallback with current intent:   "+conv.data.currentIntent)
    if(yesPhrases.includes(agent.query)){
        switch (conv.data.currentIntent){
            case "personal_details":
                conv.ask(`Ummm, We do need some personal details in order to continue`)
                conv.ask('Moshe, 35 Male',`I'm Avi, 58 years old, Man`,'Sarah, 19, Female')
                agent.context.set({
                    'name':'await_personal_details',
                    'lifespan': 5
                  });
                return conv;
            case "general_feeling":
               return generalFeeling(agent,conv);
            case "diseases":
              return  HeartRelatedDiseases(agent,conv);
            case "obesity":
              return ObesityAndExercise(agent,conv);
            case "drugs":
              return Drugs(agent,conv);
            case "smoking":
                conv.data.smoke=true;
                return smokingHabits(agent,conv);
            default: return `That doe's not really make sense to me, please try to be more specific`
          }
}
else if(noPhrases.includes(agent.query)){
  console.log('switch case no')
  console.log("default fallback conv.data.currentIntent   "+conv.data.currentIntent)
  switch (conv.data.currentIntent){
    case "personal_details":
            console.log("no personal details default fallback no ")
            conv.ask(`Ummm, We do need some personal details in order to continue`)
            conv.ask('Moshe, 35 Male',`I'm Avi, 58 years old, Man`,'Sarah, 19, Female')
            return conv;
    case "general_feeling":
       return generalFeeling(agent,conv);
    case "diseases":
      return  HeartRelatedDiseases(agent,conv);
    case "obesity":
      return ObesityAndExercise(agent,conv);
    case "drugs":
      return Drugs(agent,conv);
    case "smoking":
        conv.data.smoke=false;
       return smokingHabits(agent,conv);
    default: return "That does not really make sense to me, please try to be more specific"
  }
}   
    switch (conv.data.currentIntent) {
        case "personal_details":
            if (conv.data.name == undefined) {
                conv.ask(`I am afraid I didn't get your name, Please try again`)
                return conv;
            }
            else if (conv.data.age == undefined) {
                conv.ask(`How old are you today?`)
                return conv;

            }
            else if (conv.data.gender == undefined) {
                conv.ask(`What gender you belong to?`)
                return conv;
            }
            else {
                conv.ask(`How is you'r blood pressure ${conv.data.name}? Stress or trauma can affect it badely`)
                conv.ask(new Suggestions(['I Am stressed','I experienced a trauma','High','Very high','Low','Normal','90-134','80/120']))
                return conv;
            }
        case "general_feeling":
            if (conv.data.bloodPressure == undefined) {
                conv.ask(`How is you'r blood pressure ${conv.data.name}? Stress or trauma can affect it badely`)
                conv.ask(new Suggestions(['I Am stressed','I experienced a trauma','High','Very high','Low','Normal','90-134','80/120']))
                return conv;
            }
            else {
                conv.ask(`Let's move on to some information about your medical history, Are there any specific heart diseases you suffer from?`)
                conv.ask(new Suggestions(['No','Yes','My heart is Alrigh','Had a heart attack','Cardiac catheterization']))
            }
        case "diseases":
            if (conv.data.diabetes == undefined) {
                conv.ask('What about the level of sugar in your blood?, Do you suffer from diabetes?')
                conv.ask(new Suggestions(['No','Yes','In my childhood','Type 1','Type 2','Type 3']))
                return conv;
            }
            else if (conv.data.cholesterol == undefined) {
                return HeartRelatedDiseases(agent,conv);

            }
            else if (conv.data.heart_disease == undefined) {
                return HeartRelatedDiseases(agent,conv);

            }
            else return `Do you take care of your body? I wanna know if you exercise and if you suffer from obesity?`
        case "obesity":
            if (conv.data.obesity == undefined) {
                return `Let's get back to your exercise habits, Do you exercise at all?`

            }
            else if (conv.data.exercise == undefined) {
                return `Tell me your exersice habits `

            }
            else return 'Return to safety and  tell me about drug use'
        case "drugs":
            if (conv.data.drugs == undefined) {
                return `Let's get back to the drugs you take`

            }
            else return `I don't know what you mean but let's move on to smoking question. Do you smoke`

        case "smoking":
            conv.data.defaultfallback='dfb';
            conv=smokingHabits(agent,conv);
            if(conv.data.defaultfallback==true){
                console.log("conv.data.defaultfallback==true")
            if (conv.data.SmokingOften == undefined) {
                conv.ask(`I want to know a little about your smoking habits, What type do you smoke most frequently? How often?`)
                conv.ask()
                return conv;
            }
            else if (conv.data.SmokingType == undefined) {
                conv.ask(`What do you smoke? You can tell me a name of a brand or so`)
                return conv;

            }
           }else return conv;
        default:
            return "Please answer the last question"
    }
}