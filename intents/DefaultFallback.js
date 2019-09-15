const generalFeeling=require('./generalFeeling')
const personalDetails=require('./personalDetails')
const smokingHabits=require('./smokingHabits')
const ObesityAndExercise=require('./ObesityAndExercise')
const HeartRelatedDiseases=require('./HeartRelatedDiseases')
const Drugs=require('./Drugs')
module.exports=function(agent,conv){
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
                return `That doe's not really make sense to me, please try to be more specific`
            default: return `That doe's not really make sense to me, please try to be more specific`
          }
}
else if(noPhrases.includes(agent.query)){
  console.log('switch case no')
  console.log("conv.data.currentIntent   "+conv.data.currentIntent)
  switch (conv.data.currentIntent){
    case "personal_details":
            console.log("no personal details np no ")
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
        return 'That does not really make sense to me, please try to be more specific'
    default: return "That does not really make sense to me, please try to be more specific"
  }
}   
    switch (conv.data.currentIntent) {
        case "personal_details":
            if (conv.data.name == undefined) {
                return `Please tell me what's your name`
            }
            else if (conv.data.age == undefined) {
                return `How old are you?`

            }
            else if (conv.data.gender == undefined) {
                return `Please tell me what gender do you belong to`

            }
            else return `How are you feeling ${conv.data.name}?`
        case "general_feeling":
            if (conv.data.trauma == undefined) {
                return `Let's get back to trauma you passed lately`

            }
            else if (conv.data.feeling == undefined) {
                return `How do you feel today?`

            }
            else if (conv.data.bloodPressure == undefined) {
                return `What is your blood pressure ?`

            }
            else return `Let's move on to some information about your mediacl history, tell me about heart diseases of yours if there is any`
        case "diseases":
            if (conv.data.diabetes == undefined) {
                return `I don't think this has anything to do with your diseases`

            }
            else if (conv.data.cholesterol == undefined) {
                return `Now , can you tell me about your cholesterol ?`

            }
            else if (conv.data.heart_disease == undefined) {
                return `I think in order to go back on track i have to know about heart diseases of your's`

            }
            break;
        case "obesity":
            if (conv.data.obesity == undefined) {
                return `Please get back to talk about excersice and obesity`

            }
            else if (conv.data.exercise == undefined) {
                return `Tell me your exersice habits `

            }
            else return 'Return to safety and  tell me about drug use'
        case "drugs":
            if (conv.data.drugs == undefined) {
                return `Let's get back to the drugs you take`

            }
            else return `I don't know what you mean but let's move on to smoking question, do you smoke`

        case "smoking":
            if (conv.data.SmokingOften == undefined) {
                return `Please tell me how often do you smoke`
            }
            else if (conv.data.smokingAmount == undefined) {
                return `Let's get back to your smoking habits`

            }
            else if (conv.data.SmokingType == undefined) {
                return `Let's get back to what are you smoking`

            }
            else return 'Ok thanks '
        default:
            "answer the last question"
    }
}