const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not','not at all'];
var data,stringData="";
class Drugs{
    constructor(){

    }

    foo(agent,conv) {   
      stringData+=agent.query;+" "
      const drugs=agent.parameters.drugs;
      const no_drugs= agent.parameters.no_drugs;

      console.log("gotDrugs "+drugs)
conv.user.storage.drugs=(drugs!=''&&drugs!=undefined&&conv.user.storage.drugs==undefined)?drugs:conv.user.storage.drugs;
conv.user.storage.drugs=(no_drugs!=''&&no_drugs!=undefined)?"no":conv.user.storage.drugs;
     
const gotDrugs = conv.user.storage.drugs==undefined?0:1
    
     

     if(!gotDrugs){
     return 'Are there any pills or mediactions you take regularly? if there are please datail';
    }
     else if(gotDrugs){
       data=agent.parameters;
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