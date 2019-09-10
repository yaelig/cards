
class smokingHabits{
  constructor(){
   
  }
  foo(agent,conv) {
      
      const smokingAmount=agent.parameters.smokingAmount;
      const SmokingOften=agent.parameters.SmokingOften;
      const SmokingType=agent.parameters.SmokingType;

      const no_smokingAmount= agent.parameters.no_smokingAmount;
      const no_SmokingOften= agent.parameters.no_SmokingOften;
      const no_SmokingType= agent.parameters.no_SmokingType;
      
      console.log("smoking"+smokingAmount+ ' '+SmokingOften+ ' '+SmokingType)
conv.user.storage.smokingAmount=(smokingAmount!=''&&smokingAmount!=undefined&&conv.user.storage.smokingAmount==undefined)?smokingAmount:conv.user.storage.smokingAmount;
conv.user.storage.smokingAmount=(no_smokingAmount!=''&&no_smokingAmount!=undefined)?"no":conv.user.storage.smokingAmount;

conv.user.storage.SmokingOften=(SmokingOften!=''&&SmokingOften!=undefined&&conv.user.storage.SmokingOften==undefined)?SmokingOften:conv.user.storage.SmokingOften;
conv.user.storage.SmokingOften=(no_SmokingOften!=''&&no_SmokingOften!=undefined)?"no":conv.user.storage.SmokingOften;

conv.user.storage.SmokingType=(SmokingType!=''&&SmokingType!=undefined&&conv.user.storage.SmokingType==undefined)?SmokingType:conv.user.storage.SmokingType;
conv.user.storage.SmokingType=(no_SmokingType!=''&&no_SmokingType!=undefined)?"no":conv.user.storage.SmokingType;  

const getSmokingType = conv.user.storage.SmokingType==undefined?0:1
const getSmokingOften = conv.user.storage.SmokingOften==undefined?0:1
const getsmokingAmount = conv.user.storage.smokingAmount==undefined?0:1 

      if( getSmokingType&& getSmokingOften && !getsmokingAmount) {
          return(`ho, nooo. how many are you smoking ${SmokingType}?`);
      } 
      else 
      if(getSmokingType && !getSmokingOften && getsmokingAmount){
          return(`ho nisht! how often are you smoking ${SmokingType}?`);
      }
      else
      if(!getSmokingType && getSmokingOften && getsmokingAmount){
          return(`ho nisht! which kind?`);
      }
      else
      if(!getSmokingType && !getSmokingOften && getsmokingAmount){
          return(`poor you! how often and which kind?`);
      }
      else
      if(!getSmokingType && getSmokingOften && !getsmokingAmount){
          return(`poor you! how many and which kind?`);
      }
      else
      if(getSmokingType && !getSmokingOften && !getsmokingAmount){
          return(`poor you! how often and hoe many are you smoking ${SmokingType}?`);
      }
      else
      if(getSmokingType && !getSmokingOften && getsmokingAmount){
          return(`poor you! how often are you smoking ${SmokingType}?`);
      }
      else
      if(!getSmokingType && !getSmokingOften && !getsmokingAmount){
          return(`haloo, ma kore?`);
      }
      else
       return(`Okay chamoodi for the information i am passing it to you to see and to you'r 
        doctor. Hope you'd feel better very soon!`)
  }}

module.exports=smokingHabits;