class HeartRealtedDiseases{
    foo(agent) {
    
     const diabetes=agent.parameters['diabetes'];
     const cholesterol=agent.parameters['cholesterol']
     const heart_disease=agent.parameters['heart_disease']

     const gotDiabetes=diabetes.length>0;
     const gotCholesterol=cholesterol.length>0
     const gotHeart_disease=heart_disease.length>0
 
    //  if(gotDiabetes && gotCholesterol&&gotHeart_disease) {
    //     agent.add();
    //} else
     if(gotDiabetes && gotCholesterol&&!gotHeart_disease) {
        agent.add('sorry to hear, do you suffer now or in the past from any specific heart diseses or had experienced a heart attack?');
    } else if(gotDiabetes && !gotCholesterol&&gotHeart_disease){
        agent.add('what about your cholesterol?');
    } else if(gotDiabetes && !gotCholesterol&&!gotHeart_disease){
        agent.add('what about your cholesterol? and do you suffer from any specific heart disease?');
    }else if(!gotDiabetes && gotCholesterol&&gotHeart_disease){
        agent.add('do you suffer or sufferd before from diabetes?');
    }else if(!gotDiabetes && !gotCholesterol&&gotHeart_disease){
        agent.add('what about your cholesterol? and the suger in your blood, do you suffer from diabetes?');
    }else if(!gotDiabetes && gotCholesterol&&!gotHeart_disease){
        agent.add('what about the suger in your blood, do you suffer from diabetes?and do you suffer now or in the past from any specific heart diseses or had experienced a heart attack?');
    }else if(!gotDiabetes && !gotCholesterol&&!gotHeart_disease){
        agent.add('is there any heart disease or related the you suffer from or had in the past?');
    }
  }
    }

module.exports=HeartRealtedDiseases