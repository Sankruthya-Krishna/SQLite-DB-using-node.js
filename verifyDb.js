const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydatabase.db');
const express=require('express');
const app = express();
db.all('SELECT * FROM users', [],(err,rows)=>{
    if(err) {
        throw err;
    }
    console.log(rows);
});
//get a signle user by id
app.get('/users/:id',(req,res)=>{
    const id=req.params.id;
    db.all('SELECT * FROM users WHERE id = ?',[id],(err,data)=>{
        if(err) {
            console.log(err)
        }
        else{
            res.json(data)
        }
    });
})
db.close();