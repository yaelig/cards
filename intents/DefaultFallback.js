const generalFeeling=require('./generalFeeling')
const personalDetails=require('./personalDetails')
const smokingHabits=require('./smokingHabits')
const ObesityAndExercise=require('./ObesityAndExercise')
const HeartRelatedDiseases=require('./HeartRelatedDiseases')
const {Suggestions}=require('actions-on-google')
const Drugs=require('./Drugs')
var yesPhrases=['Yes','yea','yes','yeah','yep','yeap','that is true','true','that is right','right'];
var noPhrases=['No','no','nope','nah','not','not at all'];
module.exports=function(agent,conv){
    console.log("default fallback with current intent:   "+conv.data.currentIntent)
    if(yesPhrases.includes(agent.query)){
        switch (conv.data.currentIntent){
            case "personal_details":
                conv.ask(`Ummm, I do need some personal details in order to continue`)
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
                agent.context.set({
                    'name':'await_general_feeling',
                    'lifespan': 5
                  });
                  console.log("conextc from persona ldetails case")
                  console.log(agent.context)
            if (conv.data.name == undefined) {
                conv.ask(`I am afraid I didn't get your name, Please try again`)
                return conv;
            }
            else if (conv.data.age == undefined) {
                conv.ask(`How old are you today?`)
                return conv;

            }
            else if (conv.data.gender == undefined) {
                conv.ask(`What gender you belong to ${conv.data.name}?`)
                return conv;
            }
            else {
                conv.ask(`How is you'r blood pressure ${conv.data.name}? Stress or trauma can affect it badely`)
                conv.ask(new Suggestions(['I Am stressed','I experienced a trauma','High','Very high','Low','Normal','90-134','80/120']))
                return conv;
            }
        case "general_feeling":
                agent.context.set({
                    'name':'await_heart_related_diseases',
                    'lifespan': 5
                  });
            if(conv.data.qls>0){
                conv.data.bloodPressure='not specified';
                conv.ask(`Okay, Let's move on to some information about your medical history, Are there any specific heart diseases you suffer from?`)
                conv.ask(new Suggestions(['No','Yes','My heart is Allrigh','Had a heart attack','Cardiac catheterization']))
                return conv;
            } else   
            if (conv.data.bloodPressure == undefined) {
                conv.data.qls+=1;
                conv.ask(`How is you'r blood pressure ${conv.data.name}? Stress or trauma can affect it badely`)
                conv.ask(new Suggestions(['I Am stressed','I experienced a trauma','High','Very high','Low','Normal','90-134','80/120']))
                return conv;
            }
            else {
                conv.ask(`Let's move on to some information about your medical history, Are there any specific heart diseases you suffer from?`)
                conv.ask(new Suggestions(['No','Yes','My heart is Allrigh','Had a heart attack','Cardiac catheterization']))
                return conv;
            }
        case "diseases":
                agent.context.set({
                    'name':'await_obesity_and_exercise',
                    'lifespan': 5
                  });
                  if(conv.data.qls>0){
                    conv.data.diabetes==undefined?'not-specified':conv.data.diabetes;
                    conv.data.cholesterol==undefined?'not-specified':conv.data.cholesterol;
                    conv.ask(`Do you take care of your body? I wanna know if you exercise and if you suffer from obesity?`);
                conv.ask(new Suggestions(['I go to the gym','I run sometimes','I like walking','Jogging very often']))
                return conv;
                }       else   
            if (conv.data.diabetes == undefined) {
                conv.data.qls+=1;
                conv.ask('What about the level of sugar in your blood?, Do you suffer from diabetes?')
                conv.ask(new Suggestions(['No','Yes','In my childhood','Type 1','Type 2','Type 3']))
                return conv;
            }
            else if (conv.data.cholesterol == undefined) {
                conv.data.qls+=1;
                conv.ask(`Umm I am not sure i got it, Let me try again. What is the level of cholesterol in your blood?`)
                conv.ask(new Suggestions(['My Cholesterol is okay','A little high',`It's normal`]))
                return conv;

            }
            else if (conv.data.heart_disease == undefined) {
                conv.data.qls+=1;
                conv.ask(`I need some background about your heart situation. Do you suffer from any heart disease? Have you experienced a heart attack?`)
                conv.ask(new Suggestions(['No','Yes','My heart is allright','Had a heart attack','Cardiac catheterization']))
                return conv;
            }
            else{
                conv.ask(`Do you take care of your body? I wanna know if you exercise and if you suffer from obesity?`);
                conv.ask(new Suggestions(['I go to the gym','I run sometimes','I like walking','Jogging very often']))
                return conv;
            } 
        case "obesity":

                agent.context.set({
                    'name':'await_drugs',
                    'lifespan': 5
                  });
                  if(conv.data.qls>0){
                    conv.ask('Do you take any drugs frequently? If you do please detail')
                    conv.ask(new Suggestions(['No','Beclomethasone','Hydroxyzine','Triamcinolone','I take some pills']))
                    return conv;   
                }     else     
            if (conv.data.obesity == undefined) {
                conv.data.qls+=1;
                conv.ask(`Not sure i got it, Is your weight above average?`)
                conv.ask(new Suggestions(['Yes','No','I am very skinny','A little','Over weight']))
                return conv;
            }
            else if (conv.data.exercise == undefined) {
                conv.data.qls+=1;
               conv.ask(`Sorry I am a little lost, Do you regularly exercise?`)
               conv.ask(new Suggestions(['no','yes','I go to the gym','I run','I like walking']))
               return conv;
            }
            else{
                conv.ask('Do you take any drugs frequently? If you do please detail')
                conv.ask(new Suggestions(['No','Beclomethasone','Hydroxyzine','Triamcinolone','I take some pills']))
                return conv;       
            }
        case "drugs":    
                agent.context.set({
                    'name':'await_smoking_habits',
                    'lifespan': 5
                  });
            if (conv.data.drugs == undefined) {
                conv.ask(`I have got a little lost, Are there some pills or medications you take regurlary? `)
                conv.ask(new Suggestions(['No','Beclomethasone','Hydroxyzine','Triamcinolone','I take some pills','Loratadine']))
                return conv;  
            }

        case "smoking":
            conv=smokingHabits(agent,conv);
            if(conv.data.qls>0){
                conv.ask('Do you take any drugs frequently? If you do please detail')
                conv.ask(new Suggestions(['No','Beclomethasone','Hydroxyzine','Triamcinolone','I take some pills']))
                return conv;   
            }   else   
            if(conv.data.defaultfallback==true){
                console.log("conv.data.defaultfallback==true")
            if (conv.data.SmokingOften == undefined) {
                conv.data.qls+=1;
                conv.ask(`I want to know a little about your smoking habits, What type do you smoke most frequently? How often?`)
                conv.ask(new Suggestions(['about 5 cigarettes a day','about 10 cigarettes a day','about 20 cigarettes a day', '1 packet per day']));
                return conv;
            }
            else if (conv.data.SmokingType == undefined) {
                conv.data.qls+=1;
                conv.ask(`What do you smoke? You can tell me a name of a brand or so`)
                conv.ask(new Suggestions(['Marlboro','Parlament','Camel','Time','Cambridge','Pall Mall','Winston']))
                return conv;
            }
           }else return conv;
        default:
            return "I am totaly lost, Please begin from scratch"
    }
}