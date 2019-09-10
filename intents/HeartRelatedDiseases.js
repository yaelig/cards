const {addToJson}=require('..')
var yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
var noPhrases=['no','nope','nah','not','not at all'];
var data,stringData='';
var diabetes,cholesterol,heart_disease,no_diabetes,no_cholesterol,no_heart_disease;
class HeartRealtedDiseases{
    constructor(){
    }
    heartRelatedDisease_no(gotDiabetes,gotCholesterol,gotHeart_disease){
        if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
          this.gotDiabetes=true;
          this.agent.parameters['diabetes']='false'
        }else  if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
          gotCholesterol=true;
          this.agent.parameters['cholesterol']='false'
        }else if(gotDiabetes && gotCholesterol&&!gotHeart_disease){
            gotHeart_disease=true;
            this.agent.parameters['heart_disease']='false'
        }
       }
      heartRelatedDisease_yes(gotDiabetes,gotCholesterol,gotHeart_disease){
    if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
      gotDiabetes=true;
      this.agent.parameters['diabetes']='diabetes'
    }else  if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
      gotCholesterol=true;
      this.agent.parameters['cholesterol']='cholesterol'
    }
    else  if(gotDiabetes && gotCholesterol&&!gotHeart_disease){
        gotHeart_disease=true;
        this.agent.parameters['heart_disease']='heart_disease'
    }
   }
    foo() {
      stringData+=this.agent.query+" ";
    
      this.conv.data.diabetes===undefined?this.agent.parameters.diabetes:undefined;
      this.conv.data.cholesterol===undefined?this.agent.parameters.cholesterol:undefined;
      this.conv.data.heart_disease===undefined?this.agent.parameters.heart_disease:undefined;

     const gotDiabetes= this.conv.data.diabetes==undefined?0:1;
     const gotCholesterol=this.conv.data.cholesterol==undefined?0:1;
     const gotHeart_disease=this.conv.data.heart_disease==undefined?0:1;

     if(no_diabetes.length){
       diabetes='flase';
     }
     if(no_cholesterol){
       cholesterol='false';
     }
     if(no_heart_disease){
       heart_disease='false';
     }
     if(yesPhrases.includes(this.agent.query)){
        return this.heartRelatedDisease_yes(gotDiabetes,gotCholesterol,gotHeart_disease)
       }else if(noPhrases.includes(this.agent.query)){
         this.heartRelatedDisease_no(gotDiabetes,gotCholesterol,gotHeart_disease)
       }
   
     if(gotDiabetes && gotCholesterol&&gotHeart_disease) {
     data=this.conv.data;/////change 
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