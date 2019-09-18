const{BasicCard,Image,Button,Suggestions}=require('actions-on-google')
module.exports=function(conv){    
    conv.ask(`Hello, here in HeartBot i am willing to create a detaild diagnose of your feeling, So i am about to ask you some questions. Let's start with your personal details, Please tell me your name, age and gender`)
    conv.ask(new BasicCard({
    text: `This is a basic card.`, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    subtitle: 'This is a subtitle',
    title: 'Title: this is a title',
    buttons: new Button({
      title: 'This is a button',
      url: 'https://assistant.google.com/',
    }),
    image: new Image({
      url: `https://www.besthealthmag.ca/wp-content/uploads/sites/16/2009/04/questions_doctor.jpg`,
      alt: 'Image alternate text',
    }),
    display: 'CROPPED',
  }));
return conv;
}


