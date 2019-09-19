const app=require('../app')
const{Suggestions}=require('actions-on-google')
module.exports=function(agent,conv) {    
  conv.data.qls=0;
        console.log("personal details form "+JSON.stringify(conv.data.form))
        console.log("personal details  "+JSON.stringify(conv.data))
       // conv.data=(conv.data==undefined)?{}:conv.data;
        let name=agent.parameters.name;
        let age=agent.parameters.age||agent.parameters.age['number'];
        let gender=agent.parameters.gender;
     console.log("name age gender "+name+ ' '+age+" "+gender )
    
    // console.log("pdhyhshdd"+conv.data.name)
        conv.data.name=(name!=''&&name!=undefined&&conv.data.name==undefined)?name:conv.data.name;
        conv.data.age=(age!=''&&age!=undefined&&conv.data.age==undefined)?age:conv.data.age;
        conv.data.gender=(gender!=''&&gender!=undefined&&conv.data.gender==undefined)?gender:conv.data.gender;

    
   
       const gotname = conv.data.name==undefined?0:1
       const gotage = conv.data.age==undefined?0:1
       const gotgender =conv.data.gender==undefined?0:1
    console.log("got name age gender "+gotname+" " +gotage+" " +gotgender)
   

    if (gotname && gotage && gotgender) {
      conv.data.currentIntent='general_feeling';
      conv.ask(`Ok ${name}, We're on board let's begin. What is your blood pressure level? If you are not sure exactly just tell me if it is higher than normal`)
      conv.ask(new Suggestions(['High','Very high','Low','Normal','90-134','80/120']))
      return conv;
    }
    else if (gotname && !gotage&&!gotgender) {
   conv.ask(`Ok, ${name}, How old are you? and what is you'r gender?`)
   return conv;
    }
    else if (gotname && gotage&&!gotgender){ 
    conv.ask(`Ok, ${name}, What gender you belong to`)
    conv.ask(new Suggestions(['Male','Female','Other']))
    return conv;
    }
    else if(gotname && !gotage&&gotgender) {
    conv.ask(`Ok, ${name}, How old are you?`)
    return conv;
    }
    else if (!gotname && gotage&&gotgender) {
    conv.ask(`What's your name please?`)
    return conv;
    }
    else if (!gotname && !gotage&&gotgender) {
    conv.ask(`Well dear ${gender}, What is your name and how old are you`)
    return conv;
    }
     else if(!gotname && gotage&&!gotgender){
     conv.ask('Let me know what is your name and what is your gender')
     return conv;
     }
     else if (!gotname && !gotage&&!gotgender) {
     conv.ask(`I want to get to know you before we begin. what is you'r name?`)
     return conv;
     }
}
