const service=require('./service')
const {userId}=require('../app')
const{Button}=require('../app')
const {Suggestions,BasicCard,Image}=require('actions-on-google')
const ssmll=require('./ssml')

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
      bloodPressure:conv.data.bloodPressure
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
      SmokingOften:conv.data.SmokingOften,
      SmokingType:conv.data.SmokingType
        };
        const form=conv.data.form   
        console.log("form end of conv")
        console.log(JSON.stringify(form))     
        service(form,conv)
    conv.ask(`Okay ${conv.data.name}, thank's for the information i am passing it to you to see and to your
    doctor. Hope you'd feel better very soon!`)
    conv.ask(new BasicCard({
      title:'heart',
      text:'',
      image: new Image({
        url: `https://storage.cloud.google.com/heartbotcards/bye.gif`,
        alt: 'bye bye',
      }),
      display: 'CROPPED',
    }))
    conv.ask(new Button({
    title: 'click here to see report',
    url: `https://www.google.com/url?q=https://storage.cloud.google.com/myheartpdfbucket/${userId}.html `,
    }))
    conv.ask(new Button({
      title: 'click here to download your report',
      url: `https://www.google.com/url?q=https://storage.cloud.google.com/myheartpdfbucket/${userId}.pdf `,
      }))
    return conv;
    
   
}