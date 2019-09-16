const generalFeeling=require('./generalFeeling')
const personalDetails=require('./personalDetails')
const smokingHabits=require('./smokingHabits')
const ObesityAndExercise=require('./ObesityAndExercise')
const HeartRelatedDiseases=require('./HeartRelatedDiseases')
const Drugs=require('./Drugs')
module.exports=function(agent,conv){
    console.log("default fallback current intent:   "+conv.data.currentIntent)
    if(yesPhrases.includes(agent.query)){
        switch (conv.data.currentIntent){
            case "personal_details":
                return `That doe's not really make sense to me, please try to be more specific`
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
        return 'That does not really make sense to me, please try to be more specific'
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
                return `I didn't get your name`
            }
            else if (conv.data.age == undefined) {
                return `How old are you?`

            }
            else if (conv.data.gender == undefined) {
                return `Please tell me what gender do you belong to`

            }
            else return `What is your blood pressure level ${conv.data.name}?`
        case "general_feeling":
            if (conv.data.bloodPressure == undefined) {
                return `What is your blood pressure level?`
            }
            else return `Let's move on to some information about your mediacl history, tell me about heart diseases of yours if there is any`
        case "diseases":
            if (conv.data.diabetes == undefined) {
                return HeartRelatedDiseases(agent,conv);

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
            if (conv.data.SmokingOften == undefined) {
                return `Please tell me how often do you smoke`
            }
            else if (conv.data.smokingAmount == undefined) {
                return `Let's get back to your smoking habits`

            }
            else if (conv.data.SmokingType == undefined) {
                return `I didn't get it, Let's get back to what are you smoking`

            }
            else return 'Ok thanks '
        default:
            return "Please answer the last question"
    }
}