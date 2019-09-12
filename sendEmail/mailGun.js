module.exports=function(){
var API_KEY = '0a3bb54be5c87c4b47376d3ec11b6645-4167c382-fbf012dd';
var DOMAIN = 'sandboxed5604383f13455f9c1b9ff5bf4371b0.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const {userId}=require('../app')
console.log("file name from email "+userId)

const data = {
  from: 'mayeruthi@gmail.com',
  to: 'mayeruthi@gmail.com',
  subject: 'Patient Diagnose From HeartBot',
 
  text: 'Hello. You have just recieved a diagnose of a new patient, in order to watch it click on the link attached, you can as well download it in a pdf format bellow. Regards, Heratbot'+`D:\\homework\\Google BootCamp\\final project\\dialogflow\\bot\\pdfGenerator\\${userId}.html`,
  "o:deliverytime": 'Fri, 6 Jul 2017 18:10:10 -0000',
  attachment:(`D:\\homework\\Google BootCamp\\final project\\dialogflow\\bot\\pdfGenerator\\${userId}.pdf`)
};

mailgun.messages().send(data, (error, body) => {
  console.log(body);
});
}
