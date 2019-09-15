const request = require('request');
const connect=require('connect')
var fs = require("fs");
const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const generalFeeling=require('./intents/generalFeeling')
const welcome =require('./intents/welcome')
const personalDetails=require('./intents/personalDetails')
const smokingHabits=require('./intents/smokingHabits')
const ObesityAndExercise=require('./intents/ObesityAndExercise')
const HeartRelatedDiseases=require('./intents/HeartRelatedDiseases')
const Drugs=require('./intents/Drugs')
const service=require('./intents/service')
const {dialogflow,Permission,SignIn,actionssdk} = require('actions-on-google')

yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right']
noPhrases=['no','nope','nah','not','not at all']

const app = express()
// const ssdk=actionssdk();
// ssdk.intent('actions.intent.TEXT',(conv, input)=> {
//   console.log("TEXT")
//   conv.ask('Hi, how is it going?')
//   conv.ask(`Here's a picture of a cat`)
//   conv.ask(new Image({
//     url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
//     alt: 'A cat',
//   }))
// })

const aog = dialogflow({debug: true})
app.get('/', (req, res) => r)

app.post('/', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })
  const conv=agent.conv();
 const token=conv.user.profile.token;
 const shortToken=token.substr(token.length - 20); 
 const userId=shortToken+"$"+Date.now()
 module.exports = { userId : userId };
 console.log("user id  __________________________________________")
 console.log(userId)
  
  // function get_permission_func(){
  //   console.log("enterd get permission func ")
  //   const explicit = conv.arguments.get('PERMISSION') 
  //   const name = conv.user.name
  //   agent.add(`Thanks for the permission ${name}`)
  // }

function signIn(){
  if(conv.user.userVerificationStatus!='VERIFIED'){
  conv.ask(new SignIn());
  }
}
// ssdk.intent('actions.intent.TEXT',(conv, input)=> {
//   console.log("TEXT")
//   conv.ask('Hi, how is it going?')
//   conv.ask(`Here's a picture of a cat`)
//   conv.ask(new Image({
//     url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
//     alt: 'A cat',
//   }))
// })
function welcome_func(){
  let welc=new welcome(agent)

  // conv.ask(new Permission({
  //   context: 'Before we begin i need you to allow the following',
  //   permissions: 'NAME',
  // })) 
  // agent.add(conv)
  console.log("convusername "+JSON.stringify(conv.user.name))
  agent.add(welc.foo())

}
function defaultFallbac(){
  console.log("hi default fallback")
   const defaultFb=require('./intents/DefaultFallback')
  console.log(defaultFb(agent,conv));
  agent.add(defaultFb(agent,conv))
}
function personal_details(){
  conv.data.currentIntent="personal_details"
  conv.ask(personalDetails(agent,conv))
  agent.add(conv)

}
function general_feeling(){
  conv.data.currentIntent="general_feeling"
  conv.ask(generalFeeling(agent,conv))
  agent.add(conv)
}
function diseases(){
  conv.data.currentIntent="diseases"
   conv.ask(HeartRelatedDiseases(agent,conv))
  agent.add(conv)
}
  function obesity () {
  conv.data.currentIntent="obesity"
  conv.ask(ObesityAndExercise(agent,conv))
  agent.add(conv)
}

  function drugs(){   
    conv.data.currentIntent="drugs" 
    conv.ask(Drugs(agent,conv))
    agent.add(conv)
  }
  function smoking(){
    conv.data.currentIntent="smoking"
   conv.ask(smokingHabits(agent,conv))
   agent.add(conv)
   
  }
  function end(){
    console.log('endOfConversation app')
    console.log(JSON.stringify(conv.data))
    const endOfConv=require('./intents/EndOfConversation')
    endOfConv(agent,conv);
  }

 
  let intentMap = new Map()  
  intentMap.set('SignIn',signIn)
  // intentMap.set('getPermission', get_permission_func)
  // intentMap.set('actions.intent.PERMISSION', get_permission_func)
  // intentMap.set('actions_intent_PERMISSION', get_permission_func)
  intentMap.set('Default Welcome Intent',welcome_func)
  intentMap.set('Default Fallback Intent',defaultFallbac)
  intentMap.set('inform.PersonalDetails',personal_details) 
  intentMap.set('inform.GeneralFeeling',general_feeling)
  intentMap.set('inform.HeartRelatedDiseases', diseases)
  intentMap.set('inform.ObesityAndExercise', obesity)
  intentMap.set('inform.Drugs', drugs)
  intentMap.set('inform.Drugs - yes',smoking)
  intentMap.set('inform.Drugs - no',end)
  intentMap.set('inform.SmokingHabits',smoking)
  intentMap.set('EndOfConversation',end)
  agent.handleRequest(intentMap)
 })





app.listen(process.env.PORT || 8080)

