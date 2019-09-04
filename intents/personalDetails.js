const appClass=require('../app')
var data;
class PersonalDetails{
    constructor(agent){
        this.agent=agent   
    }
    foo() {
        if(this.agent.parameters.name.name1!=undefined)
        var name = this.agent.parameters.name.name1;
       else if(this.agent.parameters.name.name2!=undefined)
        var name = this.agent.parameters.name.name2;
         else{
        var name = this.agent.parameters.name.given-name;
         }
    const age = this.agent.parameters.age.amount;
    const gender = this.agent.parameters.gender;
    const gotname = name==''?0:1
    const gotage = age==''?0:1
    const gotgender =gender==''?0:1
    if (gotname && gotage&&gotgender) {
        data=this.agent.parameters;
      console.log('worksjsjnd')
    return `ok ${name}, please describe you'r genereal feeling to me, try to include things like your blood pressure, general feeling and share with me if you have ever experienced a trauma`
    }
    else if (gotname && !gotage&&!gotgender) 
    return `Ok, ${name}, let me know what is your age and what is your gender`;
    else if (gotname && gotage&&!gotgender) 
    return `Ok, ${name}, let me know what is your gender`;
    else if(gotname && !gotage&&gotgender) 
    return `Ok, ${name}, let me know what is your age`;
    else if (!gotname && gotage&&gotgender) 
    return `What's your name please?`;
    else if (!gotname && !gotage&&gotgender) 
    return `Didn't copy you'r name and age can you repeat please?`;
     else if(!gotname && gotage&&!gotgender) 
     return 'Let me know what is your name and what is your gender';
     else (!gotname && !gotage&&!gotgender) 
     return'Tell me about your self what is your name what is your age and what is your gender';
     
        }
        getData(){
            return data;
        }
        
 add_personal_details(name,age,gender)
{
   request({
  url:'http://localhost:64502/api/personDetails/savePersonDetails',
  method: 'POST',
  json: true, body: {name,age,gender}
  }
, function(error, response, body){
  console.log(body);
});
}
        
}

module.exports=PersonalDetails;