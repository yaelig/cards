var yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
var noPhrases=['no','nope','nah','not','not at all'];
var data,stringData='';
module.exports=function(agent,conv) {
      console.log('heart related disesasdhjsd')
      conv.data=(conv.data==undefined)?{}:conv.data;
      let diabetes=agent.parameters.diabetes;
      let cholesterol=agent.parameters.cholesterol;
      let heart_disease=agent.parameters.heart_disease;
      let no_diabetes=agent.parameters.no_diabetes;
      let no_cholesterol=agent.parameters.no_cholesterol;
      let no_heart_disease=agent.parameters.no_heart_disease;
      

      conv.data.diabetes=(diabetes!=''&&diabetes!=undefined&&conv.data.diabetes==undefined)?diabetes:conv.data.diabetes;
      conv.data.diabetes=(no_diabetes!=''&&no_diabetes!=undefined)?"no":conv.data.diabetes
      conv.data.cholesterol=(cholesterol!=''&&cholesterol!=undefined&&conv.data.cholesterol==undefined)?cholesterol:conv.data.cholesterol;
      conv.data.cholesterol=(no_cholesterol!=''&&no_cholesterol!=undefined)?"no":conv.data.cholesterol
      conv.data.heart_disease=(heart_disease!=''&&heart_disease!=undefined&&conv.data.heart_disease==undefined)?heart_disease:conv.data.heart_disease;
      conv.data.heart_disease=(no_heart_disease!=''&&no_heart_disease!=undefined)?"no":conv.data.heart_disease
 
     let gotDiabetes = conv.data.diabetes==undefined?0:1
     let gotCholesterol = conv.data.cholesterol==undefined?0:1
     let gotHeart_disease =conv.data.heart_disease==undefined?0:1
     
     
    function heartRelatedDisease_no(){
      if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
        gotDiabetes=true;
        conv.data.diabetes="no";
      }else  if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
        gotCholesterol=true;
        conv.data.cholesterol="no";
      }else if(gotDiabetes && gotCholesterol&&!gotHeart_disease){
          gotHeart_disease=true;
          conv.data.heart_disease="no";
      }else return 'That does not really make sense to me, please try to be more specific'
     }
    function heartRelatedDisease_yes(){
      if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
        gotDiabetes=true;
        conv.data.diabetes="diabetes";
      }else  if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
        gotCholesterol=true;
        conv.data.cholesterol="cholesterol";
      }else if(gotDiabetes && gotCholesterol&&!gotHeart_disease){
          gotHeart_disease=true;
          conv.data.heart_disease="not specified";
      }else return 'That does not really make sense to me, please try to be more specific'
    }

     if(yesPhrases.includes(agent.query)){
         heartRelatedDisease_yes()
       }else if(noPhrases.includes(agent.query)){
         heartRelatedDisease_no()
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

