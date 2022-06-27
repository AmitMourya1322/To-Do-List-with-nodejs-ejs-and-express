const express = require('express');
const port =8000;
const db = require('../new/config/mongoose');
const task = require('../new/task/task');
const path  = require('path');
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded());
app.get('',(req,res)=>{
    task.find({},(err)=>{
        if(err){
            console.log('no data found in the server');
            return;
        }
        return res.render('home');

    })
   
})
app.post('/create',(req,res)=>{
    task.create({
    description : req.body.description,
    category : req.body.category,
    date : req.body.date}),(err,newTask)=>{
        if(err){
            console.log('server is not found error in database');
        }
        console.log('*******',newTask);
        return res.redirect('back');

    }
    return res.redirect('back');
})



app.listen(port, (err)=>{
    if(err){
        console.log('error in server');
    }
    console.log(`Servrer is running on : ${port}`);
})