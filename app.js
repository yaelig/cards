const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const familyMedicalHistory=require('./intents/familyMedicalHistory')
const welcome=require('./intents/welcome')
const generalFeeling=require('./intents/generalFeeling')
const personalDetails=require('./intents/personalDetails')
const smokingHabits=require('./intents/smokingHabits')
const ObesityAndExercise=require('./intents/ObesityAndExercise')
const HeartRelatedDiseases=require('./intents/HeartRelatedDiseases')
const Drugs=require('./intents/Drugs')
// const {dialogflow} = require('actions-on-google')

// // Create an app instance
// const aog = dialogflow()
const app = express()

//app.get('/', (req, res) => res.send('online'))

app.post('/', express.json(), (req, res) => {
console.log(' this.req  '+req.handleRequest)
 
 const agent = new WebhookClient({ request: req, response: res })
 //console.log(agent.parameters)

//let welc=new welcome(agent)
let personalD=new personalDetails(agent)
let generalF=new generalFeeling(agent)
let hrd=new HeartRelatedDiseases(agent)
let oae=new ObesityAndExercise(agent)
let drug=new Drugs(agent)
let smoke=new smokingHabits(agent)

// function welcome(){
// agent.add(welc.foo())
// }
function personal_details(){
agent.add(personalD.foo())
}
function general_feeling(){
  agent.add(generalF.foo())
}
function diseases(){
  agent.add(hrd.foo())
}
  function obesity () {
   agent.add(oae.foo())
  }

  function drugs(){    
    agent.add(drug.foo())
  }
  function smoking(){
agent.add(smoke.foo())
  }

  let intentMap = new Map()
  //intentMap.set('Default Welcome Intent',welcome)
  intentMap.set('inform.PersonalDetails',personal_details) 
  intentMap.set('inform.HeartRelatedDiseases', diseases)
  intentMap.set('inform.ObesityAndExercise', obesity)
  intentMap.set('inform.Drugs', drugs)
  intentMap.set('inform.SmokingHabits',smoking)
  agent.handleRequest(intentMap)
})

app.listen(process.env.PORT || 8080)

 