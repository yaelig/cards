const ssmll=require('./ssml')
const{BasicCard,Image,Button,Suggestions}=require('actions-on-google')
module.exports=function(conv){ 
  conv.data.qls=0;
 conv.ask(ssmll(`Hello, here in HeartBot i am willing to create a detaild diagnose of your feeling, So i am about to ask you some questions. Let's start with your personal details, Please tell me your name, age and gender`))
 //conv.ask(`Hello, here in HeartBot i am willing to create a detaild diagnose of your feeling, So i am about to ask you some questions. Let's start with your personal details, Please tell me your name, age and gender`)   
    conv.ask(new BasicCard({
    // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    subtitle: 'We Are Here For You',
    title: 'Welcome To Heart Bot',
    image: new Image({
      url: `https://storage.cloud.google.com/heartbotcards/doc.jpg`,
      alt: 'heart',
    }),
    display: 'CROPPED',
  }));
return conv;
}


