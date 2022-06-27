const express = require('express');
const port  = 8000;
const db = require('./config/mongoose')
const Task = require('./models/dolist')
const path = require('path');

const app = express();
app.use(express.urlencoded([extended =true]))
app.use(express.static('assests'))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.path('models',path.join(__dirname,'models'));


app.get('/',function(req,res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title: "Home",
            task: task
        });
    }
)});

app.post('/create-task',function(req,res){
    Task.create({
        description : req.body.description,
        category :req.body.category,
        date : req.body.date
    },function(err,newTask){
        if(err){
            console.log('error in creating database ');
            return;
        }
        console.log('********',newTask);

        return res.redirect('back')

    })
    
})

app.get('/delete-task',function(req,res){
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});
app.listen(port,function(err){
    if(err){
        console.log('Server is not running');
    }
    console.log('Server is Running');
});