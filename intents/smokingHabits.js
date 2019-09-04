var data;
class smokingHabits{
    constructor(agent){
        this.agent=agent;
    }
    foo() {
        //const smoke = this.agent.parameters['smoke'];
        const smokingAmount = this.agent.parameters['SmokingAmount'];
        const smokingOften = this.agent.parameters['SmokingOften'];
        const smokingType = this.agent.parameters['SmokingType'];
        //const getsmoking = smoke ==''?0:1;
        const getsmokingType = smokingType ==''?0:1;
        const getsmokingOften = smokingOften ==''?0:1;
        const getsmokingAmount = smokingAmount ==''?0:1;
        
     
    // if(!smoke)
    // return "tell me again, about your smoking? ";
    // else{
        if(getsmokingType&& getsmokingOften && getsmokingAmount){
            data=this.agent.parameters;
        }
        else if( getsmokingType&& getsmokingOften && !getsmokingAmount) {
            return(`ho, nooo. how many are you smoking ${smokingType}?`);
        } 
        else 
        if(getsmokingType && !getsmokingOften && getsmokingAmount){
            return(`ho nisht! how often are you smoking ${smokingType}?`);
        }
        else
        if(!getsmokingType && getsmokingOften && getsmokingAmount){
            return(`ho nisht! which kind?`);
        }
        else
        if(!getsmokingType && !getsmokingOften && getsmokingAmount){
            return(`poor you! how often and which kind?`);
        }
        else
        if(!getsmokingType && getsmokingOften && !getsmokingAmount){
            return(`poor you! how many and which kind?`);
        }
        else
        if(getsmokingType && !getsmokingOften && !getsmokingAmount){
            return(`poor you! how often and hoe many are you smoking ${smokingType}?`);
        }
        else
        if(getsmokingType && !getsmokingOften && getsmokingAmount){
            return(`poor you! how often are you smoking ${smokingType}?`);
        }
        else
        if(!getsmokingType && !getsmokingOften && !getsmokingAmount){
            return(`frkvnrfgvrfgg`);
        }
        else return('ok, next')
    }
    getData(){
        return data;
    }
}

module.exports=smokingHabits;