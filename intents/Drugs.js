const yesPhrases=['Yes','yes','yeah','yep','yeap','that is true','true','that is right','right'];
const noPhrases=['No','no','nope','nah','not','not at all'];
const{Suggestions}=require('actions-on-google')
module.exports=function(agent,conv) {   
     console.log('drugs')
      const drugs=agent.parameters.drugs;
      const no_drugs= agent.parameters.no_drugs;

      conv.data.drugs=(drugs!=''&&drugs!=undefined&&conv.data.drugs==undefined)?drugs:conv.data.drugs;
      conv.data.drugs=(no_drugs!=''&&no_drugs!=undefined)?"no":conv.data.drugs;
     
      let gotDrugs = conv.data.drugs==undefined?0:1

      function drugs_yes(){
        gotDrugs=true;
        conv.data.drugs=agent.query;
      }
      function drugs_no(){
           gotDrugs=true;
           conv.data.drugs=agent.query;
      }

      if(yesPhrases.includes(agent.query)){
          drugs_yes()
     }
     else if(noPhrases.includes(agent.query)){
          drugs_no()
     }   

     if(!gotDrugs){
     conv.ask('Are there any pills or mediactions you take regularly? if there are please detail');
     conv.ask(new Suggestions(['No','Beclomethasone','Hydroxyzine','Triamcinolone','I take some pills']))
     return conv;
    }
     else if(gotDrugs){
          console.log("entered if gotDrugs")
         conv.data.currentIntent='smoking'
         conv.ask('All right, there is one last thing. Do you smoke?')
         conv.ask(new Suggestions(['Yes','No']))
        return conv;
        }
}