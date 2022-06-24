const app = require('express')()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const PORT = 4000
const mongoose = require('mongoose');
const { userInfo } = require('os')

mongoose.connect('mongodb://root:root@mongodb:27017/todos?authSource=admin');

var todoSchema = new mongoose.Schema({
    text:String, 
    day: String,
    reminder: Boolean
});

var TodoModel=mongoose.model('todos',todoSchema);

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    TodoModel.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Failed to retrieve the todo list')
        }
    })
})

app.post('/', (req,res)=>{
    let values = Object.values(req.body)
    let todo_instance = new TodoModel({
        text:values[1],
        day:values[2],
        reminder: values[3]
    })
    todo_instance.save()
    res.send('done')
})

app.delete('/:id',(req,res)=>{
    TodoModel.deleteOne({_id:req.params.id},function (err) {
        if (err) return handleError(err);
        if(!err) res.send('done')
      })
})

app.listen(PORT,()=>{
    console.log("Listening...")
})