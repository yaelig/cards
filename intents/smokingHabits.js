const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not'];
var gotSmokingAmount, gotSmokingOften;
var data,stringData='';
class smokingHabits{
  constructor(agent){
    this.agent=agent;
     }
     smokingHabits_no(gotSmokingAmount,gotSmokingOften){
      if (gotSmokingAmount && !gotSmokingOften){
        gotSmokingOften=true;
        this.agent.parameters['SmokingOften']='false'
      }else if(!gotSmokingAmount && gotSmokingOften){
        this.agent.parameters['SmokingAmount']='false'
         gotSmokingAmount= this.agent.parameters.exercise=='false'?true:false
      }
     }
    smokingHabits_yes(gotSmokingAmount,gotSmokingOften){
  if (gotSmokingAmount && !gotSmokingOften){
    gotSmokingOften=true;
    this.agent.parameters['SmokingOften']=this.agent.query
  //  return 'you are fat'
  }else if(!gotSmokingAmount && gotSmokingOften){
    gotSmokingAmount=true;
    this.agent.parameters['SmokingAmount']=this.agent.query
  //  return 'you exercise cool!!'
  }
 }

     foo() {     
       stringData+=this.agent.query+' ';
         console.log('agents parameters: ')
         console.log(this.agent.parameters)
        const smokingAmount=this.agent.parameters.smokingAmount;
        console.log("smoking amount of agent: "+this.agent.parameters.SmokingAmount)
        const smokingOften=this.agent.parameters.SmokingOften;
 
        const no_smokingAmount=this.agent.parameters.SmokingAmount=='no_smokingAmount'?true:false;
        const no_smokingOften=this.agent.parameters.SmokingOften=='no_smokingOften'?true:false;

        gotSmokingAmount=smokingAmount.length>0;
        gotSmokingOften=smokingOften.length>0;

        if(no_smokingAmount.length>0){
            smokingAmount='false';
          }
          if(no_smokingOften.length>0){
            smokingOften='false';
          }

     if(yesPhrases.includes(this.agent.query)){
       this.smokingHabits_yes(gotSmokingAmount,gotSmokingOften)
     }else if(noPhrases.includes(this.agent.query)){
       this.smokingHabits_no(gotSmokingAmount,gotSmokingOften)
     }

      if(gotSmokingAmount&&gotSmokingOften){
        data=this.agent.parameters;
        // const update=require('../app');
        // update.add_user()  
        return "";
      }
      else if (gotSmokingAmount && !gotSmokingOften) {
        return 'How often do you smoke?';
    } else if (!gotSmokingAmount && gotSmokingOften) {
     return 'How much do you smoke? ';
    } else {
      return 'Please describe your smoking habits to me. What do you smoke?, how often and how much?';
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

module.exports=smokingHabits;