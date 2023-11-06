const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const express = require('express');
const app = express();
const port =3000;
//connect to SQLite database
const db=new sqlite3.Database('./mydatabase.db',(err)=>{
    if(err) {
        console.log(err);
}
    else{
        console.log("connecteed to db");
    }
})
//middleware to parse request body as json
app.use(express.json())
//get all users 
app.get('/user/:id',(req,res)=>{
    const id = req.params.id;
db.all('SELECT * FROM users WHERE id = ?',[id],(err,data)=>{
    if(err) {
        console.log(err)
    }
    else{
        res.json(data)
    }
})
})
app.put('/user/:id',(req,res)=>{
    const id=req.params.id;
    const {name}=req.body
    db.all('UPDATE  users SET name=? WHERE id=?',[name,id],(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({id:this.lastId })
        }
    })
})
app.post('/user',(req,res)=>{
    const {email,name}= req.body
    db.all('INSERT INTO users(name,email) VALUES (?,?)',[name,email],(err,data)=>{
        if(err) {
            console.log(err)
        }
        else{
            res.status(201).json({id: this.lastID });
        }
    });
});
app.delete('/user/:id',(req,res)=>{
    const id=req.params.id;
    db.all('DELETE FROM users WHERE  id=?',[id],(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({
               deleted:id
            });
        }
    })
})
app.listen(port,()=>{
    console.log("server is running")
})