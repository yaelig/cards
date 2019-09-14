const yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['no','nope','nah','not','not at all'];
module.exports=function(agent,conv) {   
     console.log('drugs')
      const drugs=agent.parameters.drugs;
      const no_drugs= agent.parameters.no_drugs;

      conv.data.drugs=(drugs!=''&&drugs!=undefined&&conv.data.drugs==undefined)?drugs:conv.data.drugs;
      conv.data.drugs=(no_drugs!=''&&no_drugs!=undefined)?"no":conv.data.drugs;
     
      let gotDrugs = conv.data.drugs==undefined?0:1

      function drugs_yes(){
        gotDrugs=true;
        conv.data.drugs='yes- not specified'
      }
      function drugs_no(){
           gotDrugs=true;
           conv.data.drugs="no"
      }

      if(yesPhrases.includes(agent.query)){
          drugs_yes()
     }
     else if(noPhrases.includes(agent.query)){
          drugs_no()
     }   

     if(!gotDrugs){
     return 'Are there any pills or mediactions you take regularly? if there are please datail';
    }
     else if(gotDrugs){
         return 'All right, there is one last thing. Do you smoke?'
        }
}