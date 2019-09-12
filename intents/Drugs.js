const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not','not at all'];
module.exports=function(agent,conv) {   
     console.log('drugs')
      const drugs=agent.parameters.drugs;
      const no_drugs= agent.parameters.no_drugs;

      conv.data.drugs=(drugs!=''&&drugs!=undefined&&conv.data.drugs==undefined)?drugs:conv.data.drugs;
      conv.data.drugs=(no_drugs!=''&&no_drugs!=undefined)?"no":conv.data.drugs;
     
      let gotDrugs = conv.data.drugs==undefined?0:1
    
      if(yesPhrases.includes(agent.query)){
        blood_trauma_feel_yes()
     }
     else if(noPhrases.includes(agent.query)){
          blood_trauma_feel_no()
     }   

     if(!gotDrugs){
     return 'Are there any pills or mediactions you take regularly? if there are please datail';
    }
     else if(gotDrugs){
         return 'All right, there is one last thing. Do you smoke?'
        }
}