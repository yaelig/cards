const {addToJson}=require('../app')
const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not','not at all'];
var drugs, no_drugs;
var data;
class Drugs{
    constructor(agent,serv){
        this.agent=agent;
        this.serv=serv;
        drugs=this.agent.parameters['drugs'];
        no_drugs=this.agent.parameters.drugs=='no_drugs'?true:false;
    }
    drugs_yes(gotDrugs){
      this.gotDrugs=true;
      this.agent.parameters.drugs='drugs';
    }
    drugs_no(gotDrugs){
      this.gotDrugs=true;
      this.agent.parameters.drugs='false';
    }
    foo() {
     
     let gotDrugs=drugs.length>0;

     if(yesPhrases.includes(this.agent.query)){
        return this.drugs_yes(gotDrugs)
       }else if(noPhrases.includes(this.agent.query)){
         this.drugs_no(gotDrugs)
       }

     if(!gotDrugs){
     return 'are there any pills or mediaction you take regularly? if there are please datail';
    }
     else if(gotDrugs){
       data=this.agent.parameters;
       const update=require('../app');
       update.add_user()
       return 'bye'
        // return 'All right, one last thing i need to know about your smoking habits ?'
        }
    }
add_drugs(idPerson,nameDrug,isDrugs)
{
  request({
    url:'http://localhost:64502/api/smoking/saveSmoking',
    method: 'POST',
    json: true, body:{idPerson,nameDrug,isDrugs}
  }
  , function(error, response, body){
    console.log(body);
  });
}
getData()
{
  return data;
}
}
module.exports=Drugs