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
const {dialogflow,Permission,SignIn} = require('actions-on-google')


// // Create an app instance
//const aog = dialogflow()
const app = express()

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
let welc=new welcome(agent)
let personalD=new personalDetails()
let generalF=new generalFeeling()
let hrd=new HeartRelatedDiseases()
let oae=new ObesityAndExercise()
let drug=new Drugs()
let smoke=new smokingHabits()

//manage data:
//conv.data={}
// conv.data.form=(conv.data.form==undefined)?{}:conv.data.form;
// conv.data.form.PersonalDetails=(conv.data.form.PersonalDetails==undefined)?{}:conv.data.form.PersonalDetails;
// conv.data.form.PersonalDetails.name=(conv.data.form.PersonalDetails.name==undefined)?'':conv.data.form.PersonalDetails.name;
// conv.data.form.GeneralFeeling=(conv.data.form.GeneralFeeling==undefined)?{}:conv.data.form.GeneralFeeling;
// conv.data.form.HeartRelatedDiseases=(conv.data.form.HeartRelatedDiseases==undefined)?{}:conv.data.form.HeartRelatedDiseases;
// conv.data.form.ObesityAndExercise=(conv.data.form.ObesityAndExercise==undefined)?{}:conv.data.form.ObesityAndExercise;
// conv.data.form.Drugs=(conv.data.form.Drugs==undefined)?{}:conv.data.form.Drugs;
// conv.data.form.smokingHabits=(conv.data.form.smokingHabits==undefined)?{}:conv.data.form.smokingHabits;

  // console.log("form: "+JSON.stringify(conv.data.form))
  // console.log("user "+JSON.stringify(conv.user))

function signIn(){
  
  if(conv.user.userVerificationStatus!='VERIFIED'){
  conv.ask(new SignIn());
  agent.add(conv)}
  else welcome_func();
// if ('userId' in conv.data) {
//   userId = conv.data.userId;
// } else {
//   // generateUUID is your function to generate ids.
//   userId = generateUUID();
//   conv.data.userId = userId
// }
  // if (signin.status !== 'OK') {
  //   conv.ask('You need to sign in before using the app.');
  // }
  //  conv.ask('Great! Thanks for signing in.');
  //  agent.add(conv)
}
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
    // agent.add(`Okay thank's for the information i am passing it to you to see and to your
    // doctor. Hope you'd feel better very soon!`)
   
  }
function end(){
    console.log('endOfConversation')
    console.log(JSON.stringify(conv.data))
    conv.data.form={};
conv.data.form.PersonalDetails={
  name:conv.data.name,
  age:conv.data.age,
  gender:conv.data.gender
};
conv.data.form.GeneralFeeling={
  bloodPressure:conv.data.bloodPressure,
  trauma:conv.data.traume,
  feeling:conv.data.feeling
};
conv.data.form.HeartRelatedDiseases={
  diabetes:conv.data.diabetes,
  cholesterol:conv.data.cholesterol,
  heart_disease:conv.data.heart_disease
};
conv.data.form.ObesityAndExercise={
  obesity:conv.data.obesity,
  exercise:conv.data.exercise
 };
 conv.data.form.Drugs={
  drugs:conv.data.drugs
 };
//  if(smoke){ }
 conv.data.form.smokingHabits={
  smokingAmount:conv.data.smokingAmount,
  SmokingOften:conv.data.SmokingOften,
  SmokingType:conv.data.SmokingType
    };
 
  
    console.log("end-------------------------------------------------------------")
    console.log(JSON.stringify(conv.data.form))
    const form =conv.data.form;
    module.exports={form:form}
    agent.add("bye")
      service.call();
}

  let intentMap = new Map()  
  intentMap.set('Sign In',signIn)
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

// module.exports={
//   add_user:function(){
//    request({
//   url:'http://localhost:64502/api/users/saveUser',
//   method: 'POST',
//   json: true, body:JSON.parse(fs.readFileSync('user.json'))
//   }
// , function(error, response, body){
//   console.log(body);

// });}};


app.listen(process.env.PORT || 8080)

