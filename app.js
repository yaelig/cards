const request = require('request');
var fs = require("fs");
const express = require('express')
const service=require('./intents/service')
const { WebhookClient } = require('dialogflow-fulfillment')
const familyMedicalHistory=require('./intents/familyMedicalHistory')
const welcome=require('./intents/welcome')
const generalFeeling=require('./intents/generalFeeling')
const personalDetails=require('./intents/personalDetails')
const smokingHabits=require('./intents/smokingHabits')
const ObesityAndExercise=require('./intents/ObesityAndExercise')
const HeartRelatedDiseases=require('./intents/HeartRelatedDiseases')
const Drugs=require('./intents/Drugs')
const {dialogflow} = require('actions-on-google')


const aog = dialogflow({debug: true})
// // Create an app instance
// const aog = dialogflow()
const app = express()

app.get('/', (req, res) => res.send('online'))

fs.writeFileSync('user.json',"")
app.post('/', express.json(), (req, res) => {
 const agent = new WebhookClient({ request: req, response: res })
 const serv=new service(agent);
// let welc=new welcome(agent)
let personalD=new personalDetails(agent)
let generalF=new generalFeeling(agent)
let hrd=new HeartRelatedDiseases(agent)
let oae=new ObesityAndExercise(agent)
let drug=new Drugs(agent,serv)
let smoke=new smokingHabits(agent)

function welcome(){
agent.add(welc.foo())
}
function personal_details(){
agent.add(personalD.foo())
let data=personalD.getData()
let dataConverted = JSON.stringify(data);
let temp=fs.readFileSync('user.json');
temp+='{"personalDetails":'+dataConverted+'}'
fs.writeFileSync('user.json',temp)

const mosehehe=JSON.parse(fs.readFileSync('user.json'))
console.log('personal details jasons from function'+JSON.stringify(mosehehe))
}
function general_feeling(){
  agent.add(generalF.foo())
  let data=hrd.getData()
  let dataConverted = JSON.stringify(data);
  let temp=fs.readFileSync('user.json');
  temp+=',{"generalFeeling":'+dataConverted+'},'
  fs.writeFileSync('user.json',temp)
}
function diseases(){
  agent.add(hrd.foo())
  let data=hrd.getData()
  let dataConverted = JSON.stringify(data);
  let temp=fs.readFileSync('user.json');
  temp+=',{"heartRelatedDiseases":'+dataConverted+'}'
  fs.writeFileSync('user.json',temp)
}
  function obesity () {
   agent.add(oae.foo())
   let data=oae.getData()
   let dataConverted = JSON.stringify(data);
   let temp=fs.readFileSync('user.json');
   temp+=',{"obesityAndExercise":'+dataConverted+'}'
   fs.writeFileSync('user.json',temp)
  }

  function drugs(){    
    agent.add(drug.foo())
    let data=drug.getData()
    let dataConverted = JSON.stringify(data);
    let temp=fs.readFileSync('user.json');
    temp+=',{"drugs":'+dataConverted+'}'
    fs.writeFileSync('user.json',temp)
    
  }
  function smoking(){
    agent.add(smoke.foo())
    let data=smoke.getData()
    let dataConverted=JSON.stringify(data);
    let temp=fs.readFileSync('user.json');
    temp+=',{"smokingHabits":'+dataConverted+'}'
    fs.writeFileSync('user.json',temp)
  }

  let intentMap = new Map()
  // intentMap.set('Default Welcome Intent',welcome)
  intentMap.set('inform.PersonalDetails',personal_details) 
  intentMap.set('inform.GeneralFeeling',general_feeling)
  intentMap.set('inform.HeartRelatedDiseases', diseases)
  intentMap.set('inform.ObesityAndExercise', obesity)
  intentMap.set('inform.Drugs', drugs)
   intentMap.set('inform.Drugs - yes',smoking)
  intentMap.set('inform.SmokingHabits',smoking)
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

