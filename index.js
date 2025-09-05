const express = require('express') // epxress is stored in the variable name express
require('dotenv').config()
let app = express() // all packages of epxress are stored in the variable name app 
app.use(express.json()) // this we do to take json objects as parse 

app.get('/getData' , (req, res) =>
{
  res.send("Hello World ") 
  // Here we can pass anything like json object , html etc
  // res.write("Bye") We cant send multiple response , we can only send only one response so if we want to add the response then we can use the object in res.send 

  //res.send({name:'spandan' , sem:'5'})

  //res.send('<h1>HI</h1>')


  // we dont the error in any api line so we can handle the error by using try catch block 
  
})
app.post('/postData',(req, res) =>
{
   // we need to create a data format that we need to add so we need to manage it with frontend.
   // But for now we are using postman as frontend and will go on body and choose raw and in that json object and json will take string as an object 
    console.log(req.body)
    res.send('Product Created successfully')
   
})

/*app.listen(5000, () => 
{
  console.log('Port Started at 5000')
})
*/
app.listen(process.env.PORT, () => 
{
  console.log('Port Started at 5000')
})

// "start":"nodemon index.js" this command is used for basically we manually wrote node app.js so now what happens is we have to not stop the server for any changes and simple it will start working like react 


