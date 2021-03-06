const app=require('../app')
const ssmll=require('./ssml')
const {Suggestions,BasicCard,Image}=require('actions-on-google')
smokingTypePhrases=['Marlboro','Parlament','Camel','Time','Cambridge','Pall Mall','Winston']
smokingAmountOftenPhrases=['a day','per day','in a day','a week','per week','in a week','a month','per month',
'in a month','every day','every week','every month','each month','each day','every hour','per hour','at weekends',
'every weekend','on weekends','a lot','very much','very often','sometimes'];
module.exports=function(agent,conv) {
  conv.data.qls=0;
    conv.data=(conv.data==undefined)?{}:conv.data;
      // const smokingAmount=agent.parameters.smokingAmount;
      const SmokingOften=agent.parameters.SmokingOften||agent.parameters.smokingAmount;
      const SmokingType=agent.parameters.SmokingType;

      // const no_smokingAmount= agent.parameters.no_smokingAmount;
      const no_SmokingOften= agent.parameters.no_SmokingOften||agent.parameters.no_smokingAmount;
      const no_SmokingType= agent.parameters.no_SmokingType;
      
      console.log("smoking"+ ' '+SmokingOften+ ' '+SmokingType)
// conv.data.smokingAmount=(smokingAmount!=''&&smokingAmount!=undefined&&conv.data.smokingAmount==undefined)?smokingAmount:conv.data.smokingAmount;
// conv.data.smokingAmount=(no_smokingAmount!=''&&no_smokingAmount!=undefined)?"no":conv.data.smokingAmount;

conv.data.SmokingOften=(SmokingOften!=''&&SmokingOften!=undefined&&conv.data.SmokingOften==undefined)?SmokingOften:conv.data.SmokingOften;
conv.data.SmokingOften=(no_SmokingOften!=''&&no_SmokingOften!=undefined)?"no":conv.data.SmokingOften;

conv.data.SmokingType=(SmokingType!=''&&SmokingType!=undefined&&conv.data.SmokingType==undefined)?SmokingType:conv.data.SmokingType;
conv.data.SmokingType=(no_SmokingType!=''&&no_SmokingType!=undefined)?"no":conv.data.SmokingType;  

let gotSmokingType = conv.data.SmokingType==undefined?0:1
let gotSmokingOften = conv.data.SmokingOften==undefined?0:1
// let gotSmokingAmount = conv.data.smokingAmount==undefined?0:1 

// if(!conv.data.smoke){
//   console.log("!conv.data.smoke    =true")
//     gotSmokingType=gotSmokingAmount=gotSmokingOften=true;
// }


    console.log("gotType, gotOften  "+gotSmokingType+" "+gotSmokingOften+ "  ")
    if( !gotSmokingType&& !gotSmokingOften) {
      conv.ask(ssmll(`Please tell me about your smoking habits, What do you smoke most frequently and how often?`));
      conv.ask(new BasicCard({
        title:'heart',
        text:'',
        image: new Image({
          url: `https://storage.cloud.google.com/heartbotcards/smoke.gif`,
          alt: 'cigarettes',
        }),
        display: 'CROPPED',
      }))
      conv.ask(new Suggestions(['Parlament, a lot', '1 packet per day']));        
        return conv;
  } 
  else
      if( gotSmokingType&& !gotSmokingOften) {
          conv.ask(ssmll(`Well, how much do you smoke ${SmokingType}?`));
          conv.ask(new BasicCard({
            title:'heart',
            text:'',
            image: new Image({
              url: `https://storage.cloud.google.com/heartbotcards/cigarettes.jpg`,
              alt: 'cigarettes',
            }),
            display: 'CROPPED',
          }))
          conv.ask(new Suggestions(['about 5 cigarettes a day','about 10 cigarettes a day','about 20 cigarettes a day', '1 packet per day']));  
          return conv;
      } 
      else
      if(!gotSmokingType && gotSmokingOften){
        conv.ask(quest( `Tell me which type you smoke most frequently?`));
        conv.ask(new BasicCard({
          title:'heart',
          text:'',
          image: new Image({
            url: `https://storage.cloud.google.com/heartbotcards/cigarettes.jpg`,
            alt: 'cigarettes',
          }),
          display: 'CROPPED',
        }))
        conv.ask( new Suggestions(['Marlboro','Parlament','Camel','Time','Cambridge','Pall Mall','Winston']))
        return conv;
      }
      else
      if(gotSmokingType && gotSmokingOften){

       const endOfConversation=require('./EndOfConversation')
       return endOfConversation(agent,conv)
      }
}