const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 5000;
require("dotenv").config();
const nodeMail = require("nodemailer");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const Users=require("../src/models/user.js")
app.use(express.json())


app.use(
  express.urlencoded({ extended: true })
);
//db conection
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const url = process.env.URL;
mongoose
  .connect(url)
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));
//end db

app.get('/', (req, res) =>{
  
  res.sendFile(path.join(__dirname , "/public/index.html"));
  });
app.get('/services', (req, res) =>{

  res.sendFile(path.join(__dirname , "/public/services.html"));
  });
  
  app.get('/contacts', function(req, res) {
    res.sendFile(path.join(__dirname , "/public/contact.html"));
    });

    //contact us email setting
    async function mainMail(name, email, subject, message) {
     
      const transporter = await nodeMail.createTransport({
        service: "gmail",
        auth: {
         user: process.env.GMAIL_USER,
          pass: process.env.PASSWORD
        },
      });
      const mailOption = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: subject,
        html: `You got a message from 
        Email : ${email}
        Name: ${name}
        Message: ${message}`,
      };
      try {
        await transporter.sendMail(mailOption);
        return Promise.resolve("Message Sent Successfully!");
      } catch (error) {
        return Promise.reject(error);
      }
    }
    //end setting
    app.post("/contacts", async (req, res, next) => {
      const { name, email, subject, message } = req.body;
    
      try {
        await mainMail(name,email, subject,message);
        
        res.send("Message Successfully Sent!");
      } catch (error) {
        res.send("Message Could not be Sent");
      }
    });


    app.get('/admin', function(req, res) {
      res.sendFile(path.join(__dirname , "/public/admin.html"));
      });

      //visa form submission
      app.post('/admin',function(req,res){
        let errors = [];
        const { name, surname, dob,cnic,passport,matric,inter, bachelors, visaPurpose,statementOfPurpose, ieltsBands} =
        req.body;   
        const user= new Users({
          name:name,
          surname:surname,
          dob:dob,
          cnic:cnic,
          passport:passport,
          matric:matric,
          inter:inter,
          bachelors:bachelors,
          visaPurpose:visaPurpose,
          statementOfPurpose:statementOfPurpose,
          ieltsBands:ieltsBands
      
        });
        user.save()
        .then((result)=>{
        //  res.send(result);
        })
        .catch((err)=>{
      console.log(err)
        })
        res.redirect("/")     
      })


app.post('/contacts', function(req, res) {
    Name = req.body.Name
    email = req.body.email
    subject = req.body.subject
    message = req.body.message
    
    let outputdetailformet = `
                                 
 Name      : ${Name}
 Phone no. : ${number} 
 Email id  : ${email} 
                            
 Message   : ${message}


`

  fs.writeFileSync( Name +'_details.txt' , outputdetailformet );


  res.sendFile(path.join(__dirname, '/views/submit.html'));
   
  });


app.listen(port, ()=>{
    console.log(`your app is now on --------- http://localhost
  `)
})




