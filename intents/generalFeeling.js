yesPhrases=['yes','yeah','yep','yeap','that is true','true','that is right','right']
noPhrases=['no','nope','nah','not']
var  traum=false;
var bloodP=false;
var feel=false;
var enter_yn=false;
var data, stringData='';
class generalFeeling{ 
  constructor(){
     }
  blood_trauma_feel_yes(hadTrauma,gotbloodPressure,gotfeeling)
    {     console.log("yesssssss")
    console.log(traum,feel,bloodP)
        if (traum){
        this.agent.parameters['trauma']='trauma'
        traum=false;
        
      }else if(feel){
      
        this.agent.parameters['feeling']='feel'
       feel=false;
      }
      else if(bloodP){
        this.agent.parameters['bloodPressure']='bloodPressure'
        bloodP=false;
      }
    }
    
  blood_trauma_feel_no(hadTrauma,gotbloodPressure,gotfeeling)
  {  
    console.log("nooo")
    console.log(traum,feel,bloodP)
      if (traum){
      this.agent.parameters['trauma']='no trauma'
      traum=false;
      
    }else if(feel){
    
      this.agent.parameters['feeling']='feel good'
     feel=false;
    }
    else if(bloodP){
      this.agent.parameters['bloodPressure']='good bloodPressure'
      bloodP=false;
    }
  }
    foo() {
      // const feverDgree = this.agent.parameters['feverDgree'];
      // const vomitAmount = this.agent.parameters['vomitAmount'];
      // const painLevel = this.agent.parameters['painLevel'];
      // const painLocation = this.agent.parameters['painLocation'];
      // const timeOfPain = this.agent.parameters['timeOfPain'];
      // const havaFever = this.agent.parameters['havaFever']; 
      // const disease=this.agent.parameters['disease'];
      // const vomiteNum=this.agent.parameters['vomitNum'];
   
  //  const hasvomitN=vomiteNum.length>0;
  //  const hasdis=disease.length>0;
     // const gotfever=feverDgree.length>0
     // const gotpainloc=painLocation.length>0
   //   const gotvomit=vomitAmount.length>0
    //const gotpainLevel=painLevel.length>0
    //const timepain=timeOfPain.length>0
    //const ghavaFever=havaFever.length>0
console.log("user storage "+JSON.stringify(this.agent.conv().user.storage))
    stringData+=this.agent.query+" ";
    
    let feeling = this.agent.parameters['feeling'];  
    let gotfeeling=feeling.length>0;
    let bloodPressure=this.agent.parameters['bloodPressure'];
    let gotbloodPressure=bloodPressure.length>0;
    let Trauma=this.agent.parameters['trauma'];
    let hadTrauma=Trauma.length>0;
    if(yesPhrases.includes(this.agent.query)){
      console.log("yes");
      enter_yn=true;
         this.blood_trauma_feel_yes(hadTrauma,gotbloodPressure,gotfeeling)
         console.log(traum,feel,bloodP,enter_yn)
       }
       else if(noPhrases.includes(this.agent.query)){
         enter_yn=true;
         this.blood_trauma_feel_no(hadTrauma,gotbloodPressure,gotfeeling)

       }
       feeling = this.agent.parameters['feeling'];  
       gotfeeling=feeling.length>0;
       bloodPressure=this.agent.parameters['bloodPressure'];
        gotbloodPressure=bloodPressure.length>0;
        Trauma=this.agent.parameters['trauma'];
        hadTrauma=Trauma.length>0;
        if(enter_yn){
       traum=false;
       bloodP=false;
       feel=false;  
       enter_yn=false; 
      }    
      if(hadTrauma && gotbloodPressure && gotfeeling){
          data=this.agent.parameters;
          return 'Alright, lets move on to some information about diseases history of yours if there is any'
      }
     else if(!hadTrauma && !gotbloodPressure && !gotfeeling ){
        console.log("empty")
        return `Do you suffer from high blood pressure? if you don't know just tell me if it's higher than usual ?.`;
      }
      else  if( hadTrauma && !gotbloodPressure && gotfeeling ){
        return `That's hard for me to hear i hope you will feel good soon, have you tested you'r blood pressure lately? tell me about it`;
      }   
    else if(hadTrauma && !gotbloodPressure && !gotfeeling ){
        bloodP=true;
      return `Ok, have you tested yout blood pressure lately? if not just tell me if it's higher than normal`;
    }
   else  if(hadTrauma && gotbloodPressure && !gotfeeling ){
    console.log("feel")
     return `Well, how are you feeling today?`;
    }
    else if( !hadTrauma && gotbloodPressure && !gotfeeling ){
      console.log("trauma") 
         return `fine!,Have you been traumatized lately?,if you did what was the trauma?`;
    }
    else if( !hadTrauma && gotbloodPressure && gotfeeling ){
         return `Have you been traumatized lately?,if you did what was the trauma?`;
    }
    else if( !hadTrauma && !gotbloodPressure && gotfeeling ){
      console.log("trauma3")
       return `Have you been traumatized lately?,if you did what was the trauma?`;
    }
    else  if( hadTrauma && !gotbloodPressure && gotfeeling ){
      console.log("blood2")
    return `feel good !, do you suffer from high blood pressure ?,if you don't know just tell me if it's higher than usual ?`;
    }else
      {return `can you repeat that please`;
  }
}
getData(){
  console.log("data of general feeling:  ");
    return data;
}
getQuery(){
  return stringData;
}
}
module.exports=generalFeeling