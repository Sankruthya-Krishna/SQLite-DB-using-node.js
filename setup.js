const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydatabase.db');
db.serialize(()=>{
    //create ussers table
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
    //insert some example users
    const stmt = db.prepare('INSERT INTO users (name,email) VALUES (?,?)');
    for(let i=0;i<10;i++) {
        stmt.run(`User${i}`,`user${i}@example.com`);
    }
    stmt.finalize(); //this is where you execute the insert query
});
db.close();