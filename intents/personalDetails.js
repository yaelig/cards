const appClass=require('..')
const fs=require('fs');
var data,stringData="";

class PersonalDetails{
    constructor(){
    }
    foo(agent,conv) {   
        let name=agent.parameters.name;
        let age=agent.parameters.age['number'];
        let gender=agent.parameters.gender;
    // console.log("name age gender "+name+ ' '+age+" "+gender )
        conv.user.storage.name=(name!=''&&name!=undefined&&conv.user.storage.name==undefined)?name:conv.user.storage.name;
        conv.user.storage.age=(age!=''&&age!=undefined&&conv.user.storage.age==undefined)?age:conv.user.storage.age;
        conv.user.storage.gender=(gender!=''&&gender!=undefined&&conv.user.storage.gender==undefined)?gender:conv.user.storage.gender;

      //console.log("stor " +JSON.stringify(conv.user.storage))
   
       const gotname = conv.user.storage.name==undefined?0:1
       const gotage = conv.user.storage.age==undefined?0:1
       const gotgender =conv.user.storage.gender==undefined?0:1
    console.log("got name age gender "+gotname+" " +gotage+" " +gotgender)
   

    if (gotname && gotage&& gotgender) {
      //  data= conv.data;
   return (`Ok ${name}, Please describe you'r general feeling to me. things like your blood pressure level, a traume you've experienced and generly about how you feel right now`)
    }
    else if (gotname && !gotage&&!gotgender) 
   return (`Ok, ${name}, How old are you? and what is you'r gender?`)
    else if (gotname && gotage&&!gotgender) 
    return(`Ok, ${name}, What gender you belong to`)
    else if(gotname && !gotage&&gotgender) 
    return(`Ok, ${name}, How old are you?`)
    else if (!gotname && gotage&&gotgender) 
    return(`What's your name please?`)
    else if (!gotname && !gotage&&gotgender) 
    return(`Well dear ${gender}, What is your name and how old are you`)
     else if(!gotname && gotage&&!gotgender) 
     return('Let me know what is your name and what is your gender')
     else if (!gotname && !gotage&&!gotgender) 
     return(`I want to get to know you before we begin. what is you'r name?`)
}
        getData(){
            return data;
        }
        getQuery(){
            return stringData;
        }
        getName(){
            return conv.data.name;
        }
}

module.exports=PersonalDetails;

