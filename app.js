const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const familyMedicalHistory=require('./intents/familyMedicalHistory')
const generalFeeling=require('./intents/generalFeeling')
const personalDetails=require('./intents/personalDetails')
const smokingHabits=require('./intents/smokingHabits')
const ObesityAndExercise=require('./intents/ObesityAndExercise')
const HeartRelatedDiseases=require('./intents/HeartRelatedDiseases')
const Drugs=require('./intents/Drugs')
const {dialogflow} = require('actions-on-google')

// Create an app instance
const aog = dialogflow()
const app = express()

//app.get('/', (req, res) => res.send('online'))

app.post('/', express.json(), (req, res) => {
  console.log(' this.req  '+req)
 
 const agent = new WebhookClient({ request: req, response: res })
  console.log(agent.request_.body.queryResult.fulfillmentMessages)
let oae=new ObesityAndExercise(agent)
let drug=new Drugs()
let hrd=new HeartRelatedDiseases()

  function obesity () {
   agent.add(oae.foo())
  }

  function drugs(){
    
    drug.foo(agent)
  }
  function diseases(){
    hrd.foo(agent)
  }

  let intentMap = new Map()
  intentMap.set('inform.ObesityAndExercise', obesity)
  intentMap.set('inform.HeartRelatedDiseases', diseases)
  intentMap.set('inform.Drugs', drugs)
  agent.handleRequest(intentMap)
})

app.listen(process.env.PORT || 8080)

 