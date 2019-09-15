const app=require('../app')
module.exports=function(agent,conv) {    
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

      console.log("stor " +JSON.stringify(conv.data))
   
       const gotname = conv.data.name==undefined?0:1
       const gotage = conv.data.age==undefined?0:1
       const gotgender =conv.data.gender==undefined?0:1
    console.log("got name age gender "+gotname+" " +gotage+" " +gotgender)
   

    if (gotname && gotage&& gotgender) {
     
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
