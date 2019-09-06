const appClass=require('../app')
var data,stringData="";

class PersonalDetails{
    constructor(agent){
        this.agent=agent;
        this.conv=this.agent.conv();

        this.conv.data.name=this.agent.parameters.name;
        this.conv.data.age=this.agent.parameters.age.number;
        this.conv.data.gender=this.agent.parameters.gender;
    }
    foo() {    
        
       
     //  console.log(this.conv)

       this.conv.data.name==undefined?this.agent.parameters.name:undefined;
       this.conv.data.age==undefined?this.agent.parameters.age.number:undefined;
       this.conv.data.gender==undefined?this.agent.parameters.gender:undefined;
     
     stringData+=this.agent.query+" ";

    const name=this.conv.data.name;

    const gotname = this.conv.data.name==undefined?0:1
    const gotage = this.conv.data.age==undefined?0:1
    const gotgender =this.conv.data.gender==undefined?0:1

console.log(" gotname, gotage, gotgender "+gotname,gotage,gotgender)

    if (gotname && gotage&&gotgender) {
        data=this.conv.data;
    this.agent.add(`Ok ${name}, Please describe you'r general feeling to me. things like your blood pressure level, a traume you've experienced and generly about how you feel right now`)
    }
    else if (gotname && !gotage&&!gotgender) 
    this.agent.add(`Ok, ${name}, How old are you? and what is you'r gender?`)
    else if (gotname && gotage&&!gotgender) 
    this.agent.add(`Ok, ${name}, What gender you belong to`)
    else if(gotname && !gotage&&gotgender) 
    this.agent.add(`Ok, ${name}, How old are you?`)
    else if (!gotname && gotage&&gotgender) 
    this.agent.add(`What's your name please?`)
    else if (!gotname && !gotage&&gotgender) 
    this.agent.add(`Well dear ${gender}, What is your name and how old are you`)
     else if(!gotname && gotage&&!gotgender) 
     this.agent.add('Let me know what is your name and what is your gender')
     else if (!gotname && !gotage&&!gotgender) 
     this.agent.add(`I want to get to know you before we begin. what is you'r name?`)
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