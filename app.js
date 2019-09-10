const request = require('request');
const connect=require('connect')
var fs = require("fs");
const express = require('express')
const service=require('./intents/service')
const { WebhookClient } = require('dialogflow-fulfillment')
const generalFeeling=require('./intents/generalFeeling')
const welcome =require('./intents/welcome')
const personalDetails=require('./intents/personalDetails')
const smokingHabits=require('./intents/smokingHabits')
const ObesityAndExercise=require('./intents/ObesityAndExercise')
const HeartRelatedDiseases=require('./intents/HeartRelatedDiseases')
const Drugs=require('./intents/Drugs')
const {dialogflow,Permission} = require('actions-on-google')




// // Create an app instance
//const aog = dialogflow()
const app = express()

const aog = dialogflow({debug: true})
app.get('/', (req, res) => r)

app.post('/', express.json(), (req, res) => {
  
  const agent = new WebhookClient({ request: req, response: res })
  const conv=agent.conv();
 
let welc=new welcome(agent)
let personalD=new personalDetails()
let generalF=new generalFeeling()
let hrd=new HeartRelatedDiseases()
let oae=new ObesityAndExercise()
let drug=new Drugs()
let smoke=new smokingHabits()

function welcome_func(){
  agent.add(welc.foo())
}

function personal_details(){
  conv.ask(personalD.foo(agent,conv))
  agent.add(conv)
}
function general_feeling(){
  conv.ask(generalF.foo(agent,conv))
  agent.add(conv)
}
function diseases(){
  conv.ask(hrd.foo(agent,conv))
  agent.add(conv)
}
  function obesity () {
  conv.ask(oae.foo(agent,conv))
  agent.add(conv)
}

  function drugs(){    
    conv.ask(drug.foo(agent,conv))
    agent.add(conv)
  }
  function smoking(){
   conv.ask(smoke.foo(agent,conv))
   agent.add(conv)
    agent.add(`Okay thank's for the information i am passing it to you to see and to you'r 
    doctor. Hope you'd feel better very soon!`)
  }
  function end(){
    console.log('endOfConversation')
    service.call()
  }

  
// aog.intent('inform.PersonalDetails', (conv) => {
//   console.log("hiiiiiiiiiiiiiiiiiii")
//   conv.user.storage.name= "moshjhjhj"; 
//   conv.ask(`Hi, ${conv.user.storage.name}!.
//   Please tell me how can I help you? `);
// });

// app.intent('AboutSC', (conv) => {
//   conv.ask(`well ${conv.user.storage.name}.  What more would you like to know? `);
// });



  let intentMap = new Map()  
  intentMap.set('Default Welcome Intent',welcome_func)
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

module.exports={
  add_user:function(){
   request({
  url:'http://localhost:64502/api/users/saveUser',
  method: 'POST',
  json: true, body:JSON.parse(fs.readFileSync('user.json'))
  }
, function(error, response, body){
  console.log(body);

});}};


app.listen(process.env.PORT || 8080)

