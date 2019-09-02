class PersonalDetails{
    constructor(agent){
        this.agent=agent   
    }
    foo() {
    const name = this.agent.parameters.name.name1;
    const age = this.agent.parameters.age.amount;
    const gender = this.agent.parameters.gender;
    const gotname = name==''?0:1
    const gotage = age==''?0:1
    const gotgender =gender==''?0:1
    if (gotname && gotage&&gotgender) {
    // this.service.add_personal_details(name,age,gender);
    return `ok ${name} ,i tell me about heart diseases `
    }
    else if (gotname && !gotage&&!gotgender) 
    return `ok, ${name}, let me know what is your age and what is your gender`;
    else if (gotname && gotage&&!gotgender) 
    return `ok, ${name}, let me know what is your gender`;
    else if(gotname && !gotage&&gotgender) 
    return `ok, ${name}, let me know what is your age`;
    else if (!gotname && gotage&&gotgender) 
    return `what's your name please?`;
    else if (!gotname && !gotage&&gotgender) 
    return 'Let me know what is your name and what is your age';
     else if(!gotname && gotage&&!gotgender) 
     return 'Let me know what is your name and what is your gender';
     else (!gotname && !gotage&&!gotgender) 
     return'Tell me about your self what is your name what is your age and what is your gender';
     
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