const app=require('../app')
module.exports=function(agent,conv) {
    conv.data=(conv.data==undefined)?{}:conv.data;
      const smokingAmount=agent.parameters.smokingAmount;
      const SmokingOften=agent.parameters.SmokingOften;
      const SmokingType=agent.parameters.SmokingType;

      const no_smokingAmount= agent.parameters.no_smokingAmount;
      const no_SmokingOften= agent.parameters.no_SmokingOften;
      const no_SmokingType= agent.parameters.no_SmokingType;
      
      console.log("smoking"+smokingAmount+ ' '+SmokingOften+ ' '+SmokingType)
conv.data.smokingAmount=(smokingAmount!=''&&smokingAmount!=undefined&&conv.data.smokingAmount==undefined)?smokingAmount:conv.data.smokingAmount;
conv.data.smokingAmount=(no_smokingAmount!=''&&no_smokingAmount!=undefined)?"no":conv.data.smokingAmount;

conv.data.SmokingOften=(SmokingOften!=''&&SmokingOften!=undefined&&conv.data.SmokingOften==undefined)?SmokingOften:conv.data.SmokingOften;
conv.data.SmokingOften=(no_SmokingOften!=''&&no_SmokingOften!=undefined)?"no":conv.data.SmokingOften;

conv.data.SmokingType=(SmokingType!=''&&SmokingType!=undefined&&conv.data.SmokingType==undefined)?SmokingType:conv.data.SmokingType;
conv.data.SmokingType=(no_SmokingType!=''&&no_SmokingType!=undefined)?"no":conv.data.SmokingType;  

const getSmokingType = conv.data.SmokingType==undefined?0:1
const getSmokingOften = conv.data.SmokingOften==undefined?0:1
const getsmokingAmount = conv.data.smokingAmount==undefined?0:1 

      if( getSmokingType&& getSmokingOften && !getsmokingAmount) {
          return(`Well, how much do you smoke ${SmokingType}?`);
      } 
      else 
      if(getSmokingType && !getSmokingOften && getsmokingAmount){
          return(`And how often do you smoke ${SmokingType}?`);
      }
      else
      if(!getSmokingType && getSmokingOften && getsmokingAmount){
          return(`Tell me which type you smoke most frequently? `);
      }
      else
      if(!getSmokingType && !getSmokingOften && getsmokingAmount){
          return(`Tell me which type you smoke most frequently? And how often`);
      }
      else
      if(!getSmokingType && getSmokingOften && !getsmokingAmount){
          return(`Tell me which type you smoke most frequently? And how much?`);
      }
      else
      if(getSmokingType && !getSmokingOften && !getsmokingAmount){
          return(`Well, how often and how much do you smoke ${SmokingType}?`);
      }
      else
      if(!getSmokingType && !getSmokingOften && !getsmokingAmount){
          return(`I still need to know a little about your smoking habits. How much and how frequently do you smoke?`);
      }
      else
      if(getSmokingType && getSmokingOften && getsmokingAmount){
       const endOfConversation=require('./EndOfConversation')
       return endOfConversation(agent,conv)
      }
}