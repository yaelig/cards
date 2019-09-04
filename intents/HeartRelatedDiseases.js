const {addToJson}=require('../app')
var yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
var noPhrases=['no','nope','nah','not','not at all'];
var data;
var diabetes,cholesterol,heart_disease,no_diabetes,no_cholesterol,no_heart_disease;
class HeartRealtedDiseases{
    constructor(agent){
        this.agent=agent;
         diabetes=this.agent.parameters['diabetes'];
         cholesterol=this.agent.parameters['cholesterol']
         heart_disease=this.agent.parameters['heart_disease']

         no_diabetes=this.agent.parameters.diabetes=='no_diabetes'?true:false;
         no_cholesterol=this.agent.parameters.cholesterol=='no_cholesterol'?true:false;
         no_heart_disease=this.agent.parameters.heart_disease=='no_heart_disease'?true:false;

          // this.agent.setContext('inform.HeartRelatedDiseases');
          // const context = {'name': 'await_obesity_and_exercise', 'lifespan': 2, 'parameters': {'diabetes': 'Moshe'}};
          // this.agent.setContext(context);
          // this.agent.context.set({         
          //   'name':'await_obesity_and_exercise',
          //   'lifespan': 5,
          //   'parameters':{
          //     'exercise':'moshe'
          //     }
          // });
        // this.agent.context.get('await_heart_related_diseases').parameters.diabetes='diabetes';
          // await_heart.parameters.diabetes='moshe';
          // await_heart.parameters['diabetes.original']='moshe2'
    
  
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
     const gotDiabetes= this.agent.parameters.diabetes.length>0;
     const gotCholesterol=cholesterol.length>0;
     const gotHeart_disease=heart_disease.length>0;

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
     data=this.agent.parameters;
        return 'Thanks for that, please tell me about your exercise habits, i need to know if exercise and if you suffer from obesity'
    } else if(gotDiabetes && gotCholesterol&&!gotHeart_disease) {
        return 'sorry to hear, do you suffer now or in the past from any specific heart diseses or had experienced a heart attack? please detail';
    } else if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
        return'what about your cholesterol? is it higher than usual?';
    } else if(gotDiabetes && !gotCholesterol&&!gotHeart_disease){
        return'what about your cholesterol? and do you suffer from any specific heart disease?';
    }else if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
        return 'do you suffer or sufferd before from diabetes?';
    }else if(!gotDiabetes && !gotCholesterol&&gotHeart_disease){
        return 'what about your cholesterol? and the suger in your blood, do you suffer from diabetes?';
    }else if(!gotDiabetes && gotCholesterol&&!gotHeart_disease){
        return 'what about the suger in your blood, do you suffer from diabetes?and do you suffer now or in the past from any specific heart diseses or had experienced a heart attack?';
    }else if(!gotDiabetes && !gotCholesterol&&!gotHeart_disease){
        return 'is there any heart disease or related the you suffer from or had in the past?';
    }
  }
  getData()
  {
    return data;
  }
    }

module.exports=HeartRealtedDiseases