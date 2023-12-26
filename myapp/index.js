const express = require("express");
const {open} = require('sqlite');
const sqlite3 = require('sqlite3')
const path = require("path");
const app = express();

const dbPath=path.join(__dirname,"goodreads.db");
let db = null;
const initializeDBAndServer = async ()=>{

    try {
         db = await  open({
          filename:  dbPath,
          driver: sqlite3.Database
        } );
      app.listen(3000,()=>{
    console.log("Server is Running at Local_Host:3000")
  });

    } catch (error) {
        console.log(`DB Error: ${error.message}`);
       process.exit(1);        
    }
 
};

initializeDBAndServer();

app.get('/books/',async (req,res)=>{
    const getBooksQuery = `
    SELECT * FROM book ORDER BY book_id LIMIT 3;`;
   const booksArray = await db.all(getBooksQuery);
   res.send(booksArray);
})





