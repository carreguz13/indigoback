import express from "express"
import mysql from "mysql"

const app = express()


//start connection with mysql
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "indigo"
})


app.listen(3001, ()=>{
    console.log("connected to backend!")
})

app.get("/", (req, res) => {
    res.json("Hello, backend!!!");
  });


//we´r getting the array of indigo bellydance in json form
app.get("/bellydance", (req, res)=>{
const q = "SELECT * FROM bellydance"
db.query(q, (err, data)=>{
if(err) return res.json(err)
return res.json(data)
})
})

//now we need to create the post method because we want to put information into this list in the server with post 
app.post("/bellydance", (req, res)=>{
const q = "INSERT INTO bellydance (nombre, edad, grupo) VAlUES (?)"
const values = ["joshua", "18", "bellydance"]
db.query(q, [values], (err,data) =>{
    if(err) return res.json(err)
return res.json("se postulo bien perro")
})
})