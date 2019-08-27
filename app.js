const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const familyMedicalHistory=require('./intents/familyMedicalHistory')
const generalFeeling=require('./intents/generalFeeling')
const personalDetails=require('./intents/personalDetails')
const smokingHabits=require('./intents/smokingHabits')
const personalMedicalHistory=require('./intents/personalMedicalHistory')
const app = express()


app.get('/', (req, res) => res.send('online'))
let pmh=new personalMedicalHistory()
app.post('/', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  function welcome () {
    agent.add(pmh.foo())
  }

  let intentMap = new Map()
  intentMap.set('inform.PersonalMedicalHistory', welcome)
  agent.handleRequest(intentMap)
})

app.listen(process.env.PORT || 8080)

  