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

const exp=express()
const app=dialogflow({debug:true})
const p=new personalDetails()
exp.get('/', (req, res) => r)
exp.post('/', express.json(), (req, res) => {

  const agent = new WebhookClient({ request: req, response: res })
   console.log(agent.intent)
   console.log(agent.action)

   const conv=agent.conv();
   function welcome(){
    conv.ask("hello from index")
    conv.user.storage.welc="welcome message"
   agent.add(conv);
   }
   function person(){
    conv.ask(p.foo(agent,conv))
    agent.add(conv);
  //   conv.ask("hello from person")
  //   conv.user.storage.pers="person"
     console.log(JSON.stringify(conv.user.storage))
  //  agent.add(conv);
   }
// app.intent('Default Welcome Intent',(conv)=>{
//   console.log("hello")
//   conv.ask("welcone from app intent ")
//   });

let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('inform.PersonalDetails', person);
  agent.handleRequest(intentMap);

});
exp.listen(process.env.PORT || 8080)