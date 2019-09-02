const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not','not at all'];
class Drugs{
    constructor(agent){
        this.agent=agent;
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
        const drugs=agent.parameters['drugs'];
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
         return 'All right, one last thing i need to know about your smoking habits ?'
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
 
}
module.exports=Drugs