var yesPhrases=['Yes','yes','yeah','yep','yeap','that is true','true','that is right','right'];
var noPhrases=['No','no','nope','nah','not','not at all'];
const {Suggestions}=require('actions-on-google')
module.exports=function(agent,conv) {
    
      console.log("c   "+conv.data.currentIntent)
      console.log("q    "+conv.data.hrdQ)
      conv.data=(conv.data==undefined)?{}:conv.data;
      let diabetes=agent.parameters.diabetes;
      let cholesterol=agent.parameters.cholesterol;
      let heart_disease=agent.parameters.heart_disease;
      let no_diabetes=agent.parameters.no_diabetes;
      let no_cholesterol=agent.parameters.no_cholesterol;
      let no_heart_disease=agent.parameters.no_heart_disease;
      console.log('heartdiseas diabetes cholesterol  '+heart_disease+" " +diabetes+"  " +cholesterol)

      conv.data.diabetes=(diabetes!=''&&diabetes!=undefined&&conv.data.diabetes==undefined)?diabetes:conv.data.diabetes;
      conv.data.diabetes=(no_diabetes!=''&&no_diabetes!=undefined)?"no":conv.data.diabetes
      conv.data.cholesterol=(cholesterol!=''&&cholesterol!=undefined&&conv.data.cholesterol==undefined)?cholesterol:conv.data.cholesterol;
      conv.data.cholesterol=(no_cholesterol!=''&&no_cholesterol!=undefined)?"no":conv.data.cholesterol
      conv.data.heart_disease=(heart_disease!=''&&heart_disease!=undefined&&conv.data.heart_disease==undefined)?heart_disease:conv.data.heart_disease;
      conv.data.heart_disease=(no_heart_disease!=''&&no_heart_disease!=undefined)?"no":conv.data.heart_disease
 
     let gotDiabetes = conv.data.diabetes==undefined?0:1
     let gotCholesterol = conv.data.cholesterol==undefined?0:1
     let gotHeart_disease =conv.data.heart_disease==undefined?0:1
     
     console.log("data "+JSON.stringify(conv.data))
     
    function heartRelatedDisease_no(){
      switch(conv.data.hrdQ){
        case 'heart':
          gotHeart_disease=true;
          console.log("heart disease becoming true")
          conv.data.heart_disease="no- not specified"
          break;
        case 'diabetes':
          gotDiabetes=true;
          conv.data.diabetes="no- not specified";
          break;
        case 'cholesterol':
          gotCholesterol=true;
          conv.data.cholesterol="no- not specified"
          break;
      }

     }
    function heartRelatedDisease_yes(){
      switch(conv.data.hrdQ){
        case 'heart':
          gotHeart_disease=true;
          conv.data.heart_disease="yes- not specified"
          break;
        case 'diabetes':
          gotDiabetes=true;
          conv.data.diabetes="yes- not specified";
          break;
        case 'cholesterol':
          gotCholesterol=true;
          conv.data.cholesterol="yes- not specified"
          break;
        }
         }
     if(yesPhrases.includes(agent.query)){
         heartRelatedDisease_yes()
       }else if(noPhrases.includes(agent.query)){
         heartRelatedDisease_no()
       }
   
     if(gotDiabetes && gotCholesterol&&gotHeart_disease) {
       conv.data.currentIntent='obesity'
        conv.data.oaeQ='exercise';
        conv.ask(`Thanks for that, we'll be finished in a bit. Please tell me about your exercise habits, do you exercise at all?, how often? et cetera`)
        conv.ask(new Suggestions(['I go to the gym','I run sometimes','I like walking a lot','Jogging very often']))
        return conv;
    } else if(gotDiabetes && gotCholesterol&&!gotHeart_disease) {
      conv.data.hrdQ='heart'
      conv.ask('Okay, Do you suffer from any specific heart diseses or had experienced a heart attack? please detail');
      conv.ask(new Suggestions(['No','Yes','My heart is cool','Had a heart attack','Cardiac catheterization']))
      return conv;
    } else if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
      conv.data.hrdQ='cholesterol'
      conv.ask('How is your cholesterol?');
      conv.ask(new Suggestions(['My Cholesterol is okay','A little high',`It's normal`]))
      return conv;
    } else if(gotDiabetes && !gotCholesterol&&!gotHeart_disease){
      conv.data.hrdQ='heart'
       conv.ask('Do you suffer from any specific heart disease?');
       conv.ask(new Suggestions(['No','Yes','My heart is cool','Had a heart attack','Cardiac catheterization']))
       return conv;
    }else if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
      conv.data.hrdQ='diabetes'
       conv.ask('Do you suffer or sufferd in the past from diabetes?');
       conv.ask(new Suggestions(['No','Yes','In my childhood','Type 1','Type 2','Type 3']))
       return conv;
    }else if(!gotDiabetes && !gotCholesterol&&gotHeart_disease){
      conv.data.hrdQ='cholesterol'
      console.log("conv.data.hrdQ   "+conv.data.hrdQ)
        conv.ask('What about your cholesterol? ');
        conv.ask(new Suggestions(['My Cholesterol is okay','A little high',`It's normal`]))
        return conv;
    }else if(!gotDiabetes && gotCholesterol&&!gotHeart_disease){
      conv.data.hrdQ='heart'
        conv.ask('Any specific heart diseses or have you experienced a heart attack?');
        conv.ask(new Suggestions(['No','Yes','My heart is cool','Had a heart attack','Cardiac catheterization']))
        return conv;
    }else if(!gotDiabetes && !gotCholesterol&&!gotHeart_disease){
      conv.data.hrdQ='heart'
        conv.ask('Is there any heart disease or related you suffer from or had in the past? Have you experienced a heart attack?');
        conv.ask(new Suggestions(['No','Yes','My heart is cool','Had a heart attack','Cardiac catheterization']))
        return conv;
    }
  }

