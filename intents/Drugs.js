const {addToJson}=require('../app')
const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not','not at all'];
var drugs, no_drugs;
var data,stringData="";
class Drugs{
    constructor(agent){
        this.agent=agent;
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
     stringData+=this.agent.query;+" "
     let gotDrugs=drugs.length>0;

     if(yesPhrases.includes(this.agent.query)){
        return this.drugs_yes(gotDrugs)
       }else if(noPhrases.includes(this.agent.query)){
         this.drugs_no(gotDrugs)
       }

     if(!gotDrugs){
     return 'Are there any pills or mediactions you take regularly? if there are please datail';
    }
     else if(gotDrugs){
       data=this.agent.parameters;
       //return 'bye'
         return 'All right, there is one last thing. Do you smoke?'
        }
    }
getData()
{
  return data;
}
getQuery(){
  return stringData;
}
}
module.exports=Drugs