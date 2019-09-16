const service=require('./service')
module.exports=function(agent,conv){
        console.log('endOfConversation')
        console.log(JSON.stringify(conv.data))
        conv.data.form={};
    conv.data.form.PersonalDetails={
      name:conv.data.name,
      age:conv.data.age,
      gender:conv.data.gender
    };
    conv.data.form.GeneralFeeling={
      bloodPressure:conv.data.bloodPressure,
      trauma:conv.data.traume,
      feeling:conv.data.feeling
    };
    conv.data.form.HeartRelatedDiseases={
      diabetes:conv.data.diabetes,
      cholesterol:conv.data.cholesterol,
      heart_disease:conv.data.heart_disease
    };
    conv.data.form.ObesityAndExercise={
      obesity:conv.data.obesity,
      exercise:conv.data.exercise
     };
     conv.data.form.Drugs={
      drugs:conv.data.drugs
     };
    //  if(smoke){ }
     conv.data.form.smokingHabits={
      smokingAmount:conv.data.smokingAmount,
      SmokingOften:conv.data.SmokingOften,
      SmokingType:conv.data.SmokingType
        };
        const form=conv.data.form   
        console.log("form endofconv")
        console.log(JSON.stringify(form))     
        service(form,conv)
    conv.ask(`Okay ${conv.data.name}, thank's for the information i am passing it to you to see and to your
    // doctor. Hope you'd feel better very soon!`)
    return conv;
    
   
}