const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const generalFeeling=require('./intents/generalFeeling')
const welcome =require('./intents/welcome')
const personalDetails=require('./intents/personalDetails')
const smokingHabits=require('./intents/smokingHabits')
const ObesityAndExercise=require('./intents/ObesityAndExercise')
const HeartRelatedDiseases=require('./intents/HeartRelatedDiseases')
const Drugs=require('./intents/Drugs')
const ssmll=require('./intents/ssml')
const service=require('./intents/service')
const {dialogflow,Permission,SignIn,actionssdk} = require('actions-on-google')

yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right']
noPhrases=['no','nope','nah','not','not at all']

const app = express()

const aog = dialogflow({debug: true,clientId: process.env.CLIENT_ID})
app.get('/', (req, res) => {res.json({success : true}) })

app.post('/', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })
  const conv=agent.conv();
//  const token=conv.user.profile.token;
//  const shortToken=token.substr(token.length - 20); 
//  const userId=shortToken+"$"+Date.now()
//  module.exports.userId= userId ;
//  console.log("user id: "+userId)
 console.log("stor " +JSON.stringify(conv.data))
  // function get_permission_func(){
  //   console.log("enterd get permission func ")
  //   const explicit = conv.arguments.get('PERMISSION') 
  //   const name = conv.user.name
  //   agent.add(`Thanks for the permission ${name}`)
  // }
  function signIn(){
    console.log("entered sign in ")
     console.log("conv.user.userVerificationStatus   "+JSON.stringify(conv.user))
   if(conv.user.userVerificationStatus!='VERIFIED'){
     conv.ask(new SignIn('In order to send you the form at the end of conversation'));
     console.log("eMail   "+JSON.stringify(agent.conv().user.email))
    }
  else conv.ask("you are signed")
  agent.add(conv);
} 
function welcome_func(){
  console.log('entered welcome func ')
  // console.log(JSON.stringify(agent.context))
  conv.data.qls=0;
  conv.data.currentIntent='personal_details';
  agent.add(welcome(conv))
 }
function defaultFallbac(){
  console.log("hi default fallback function at app")
  conv.data.currentIntent==undefined?"personal_details":conv.data.currentIntent;
  console.log("current intent from app "+conv.data.currentIntent)
   const defaultFb=require('./intents/DefaultFallback')
  agent.add(defaultFb(agent,conv))
}
function personal_details(){
  conv.data.qls=0;
  conv.data.currentIntent="personal_details"
  agent.add(personalDetails(agent,conv))

}
function general_feeling(){
  conv.data.qls=0;
  conv.data.currentIntent="general_feeling"
  agent.add(generalFeeling(agent,conv))
}
function diseases(){
  conv.data.qls=0;
  conv.data.currentIntent="diseases"
  agent.add(HeartRelatedDiseases(agent,conv))
}
  function obesity () {
    conv.data.qls=0;
  conv.data.currentIntent="obesity"
  agent.add(ObesityAndExercise(agent,conv))
}

  function drugs(){   
    conv.data.qls=0;
    conv.data.currentIntent="drugs" 
    agent.add(Drugs(agent,conv))
  }
  function smoking(){
    conv.data.qls=0;
    conv.data.currentIntent="smoking"
   console.log("smoking function app")
   agent.add(smokingHabits(agent,conv))
   
  }
  function end(){
    console.log('endOfConversation app')
    console.log(JSON.stringify(conv.data))
    const endOfConv=require('./intents/EndOfConversation')
    agent.add(endOfConv(agent,conv));
  }

 
  let intentMap = new Map()  
  intentMap.set('SIGN_IN',signIn)
  // intentMap.set('getPermission', get_permission_func)
  // intentMap.set('actions.intent.PERMISSION', get_permission_func)
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

module.exports.app=app;

app.listen(process.env.PORT || 8080)

