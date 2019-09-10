var yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
var noPhrases=['no','nope','nah','not','not at all'];
var data,stringData='';
class HeartRealtedDiseases{
    constructor(){
    }

    heartRelatedDisease_no(gotDiabetes,gotCholesterol,gotHeart_disease){
        if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
          gotDiabetes=true;
          conv.user.storage.diabetes="no";
        }else  if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
          gotCholesterol=true;
          conv.user.storage.cholesterol="no";
        }else if(gotDiabetes && gotCholesterol&&!gotHeart_disease){
            gotHeart_disease=true;
            conv.user.storage.heart_disease="no";
        }
       }
      heartRelatedDisease_yes(gotDiabetes,gotCholesterol,gotHeart_disease){
        if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
          gotDiabetes=true;
          conv.user.storage.diabetes="diabetes";
        }else  if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
          gotCholesterol=true;
          conv.user.storage.cholesterol="cholesterol";
        }else if(gotDiabetes && gotCholesterol&&!gotHeart_disease){
            gotHeart_disease=true;
            conv.user.storage.heart_disease="heart disease";
        }
   }
    foo(agent,conv) {

      let diabetes=agent.parameters.diabetes;
      let cholesterol=agent.parameters.cholesterol;
      let heart_disease=agent.parameters.heart_disease;
      let no_diabetes=agent.parameters.no_heart_disease;
      let no_cholesterol=agent.parameters.no_heart_disease;
      let no_heart_disease=agent.parameters.no_heart_disease;
 

      conv.user.storage.diabetes=(diabetes!=''&&diabetes!=undefined&&conv.user.storage.diabetes==undefined)?diabetes:conv.user.storage.diabetes;
      conv.user.storage.diabetes=(no_diabetes!=''&&no_diabetes!=undefined)?"no":conv.user.storage.diabetes
      conv.user.storage.cholesterol=(cholesterol!=''&&cholesterol!=undefined&&conv.user.storage.cholesterol==undefined)?cholesterol:conv.user.storage.cholesterol;
      conv.user.storage.cholesterol=(no_cholesterol!=''&&no_cholesterol!=undefined)?"no":conv.user.storage.cholesterol
      conv.user.storage.heart_disease=(heart_disease!=''&&heart_disease!=undefined&&conv.user.storage.heart_disease==undefined)?heart_disease:conv.user.storage.heart_disease;
      conv.user.storage.heart_disease=(no_heart_disease!=''&&no_heart_disease!=undefined)?"no":conv.user.storage.heart_disease
 
      
     const gotDiabetes = conv.user.storage.diabetes==undefined?0:1
     const gotCholesterol = conv.user.storage.cholesterol==undefined?0:1
     const gotHeart_disease =conv.user.storage.heart_disease==undefined?0:1

     if(yesPhrases.includes(agent.query)){
         this.heartRelatedDisease_yes(gotDiabetes,gotCholesterol,gotHeart_disease)
       }else if(noPhrases.includes(agent.query)){
         this.heartRelatedDisease_no(gotDiabetes,gotCholesterol,gotHeart_disease)
       }
   
     if(gotDiabetes && gotCholesterol&&gotHeart_disease) {
        return `Thanks for that, we'll be finished in a bit. Please tell me about your exercise habits, do you exercise at all?, how often? et cetera`
    } else if(gotDiabetes && gotCholesterol&&!gotHeart_disease) {
        return 'Okay, Do you suffer from any specific heart diseses or had experienced a heart attack? please detail';
    } else if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
        return'What about your cholesterol?';
    } else if(gotDiabetes && !gotCholesterol&&!gotHeart_disease){
        return'What about your cholesterol? And do you suffer from any specific heart disease?';
    }else if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
        return 'Do you suffer or sufferd in the past from diabetes?';
    }else if(!gotDiabetes && !gotCholesterol&&gotHeart_disease){
        return 'What about your cholesterol? and the suger in your blood, do you suffer from diabetes?';
    }else if(!gotDiabetes && gotCholesterol&&!gotHeart_disease){
        return 'Do you suffer from diabetes? Any specific heart diseses or have you experienced a heart attack?';
    }else if(!gotDiabetes && !gotCholesterol&&!gotHeart_disease){
        return 'Is there any heart disease or related you suffer from or had in the past? Have you experienced a heart attack?';
    }
  }
  getData()
  {
    return data;
  }
  getQuery(){
    return stringData;
}
}

module.exports=HeartRealtedDiseases