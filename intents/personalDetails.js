const appClass=require('../app')
const fs=require('fs');
var data,stringData="";

class PersonalDetails{
    constructor(agent){
        this.agent=agent;
        this.conv=agent.conv();
    }
    foo(conv) {   
    
        let name=this.agent.parameters.name;
        let age=this.agent.parameters.age['number'];
        let gender=this.agent.parameters.gender;
        console.log("conv user storage 1"+JSON.stringify(this.conv.user.storage))
     
        console.log("name age gender "+name+" " +age+" "+gender)
        // this.conv.user.storage.name=this.agent.parameters.name;
        // this.conv.user.storage.age=this.agent.parameters.age.number;
        // this.conv.user.storage.gender=this.agent.parameters.gender;
     console.log("this.conv.user.storage.name    "+ this.conv.user.storage.name)
        this.conv.user.storage.name=(name!=""&&name!=undefined&& this.conv.user.storage.name==undefined)?name:undefined;
        this.conv.user.storage.age=(age!=''&&age!=undefined&& this.conv.user.storage.age==undefined)?age:undefined;
        this.conv.user.storage.gender=(gender!=''&&gender!=undefined&& this.conv.user.storage.gender==undefined)?gender:undefined

      console.log("conv user storage 2"+JSON.stringify(this.conv.user.storage))
     
    //  this.conv.user.storage.name=(this.conv.user.storage.name=='')?undefined:this.agent.parameters.name;
    //  this.conv.user.storage.age=(this.conv.user.storage.age=='')?undefined:this.agent.parameters.age.number;
    //  this.conv.user.storage.gender=(this.conv.user.storage.gender=='')?undefined:this.agent.parameters.gender;
      
       console.log("conv.data 2")
       console.log(conv.user.storage)
       console.log("parameters")
       console.log(this.agent.parameters)
      
       const gotname = this.conv.user.storage.name==undefined?0:1
       const gotage = this.conv.user.storage.age==undefined?0:1
       const gotgender =this.conv.user.storage.gender==undefined?0:1
       console.log("2 gotname, gotage, gotgender "+gotname,gotage,gotgender)
       console.log("agentaddconv1")

       console.log("agentaddconv2")
     stringData+=this.agent.query+" ";

    // const name=this.conv.user.storage.name;
    // const gender=this.conv.user.storage.gender;

    


    if (gotname && gotage&&gotgender) {
      //  data=this.conv.data;
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

