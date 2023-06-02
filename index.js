import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()


//start connection with mysql
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

app.use(express.json())
app.use(cors())

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




//we´r getting the array of indigo bellydance, folklore & ballet in json form
app.get("/bellydance", (req, res)=>{
const q = "SELECT * FROM indigo.bellydance"
db.query(q, (err, data)=>{
if(err) return res.json(err)
return res.json(data)
})
})

app.get("/folklore", (req, res)=>{
    const q = "SELECT * FROM indigo.folklore"
    db.query(q, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
    })
    })
    
app.get("/ballet", (req, res)=>{
    const q = "SELECT * FROM indigo.ballet"
    db.query(q, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
    })
    })


//now we need to create the post method because we want to put information into this list in the server with post 
app.post("/bellydance", (req, res)=>{
const q = "INSERT INTO bellydance (nombre, edad, grupo) VAlUES (?)"
const values = [
    req.body.nombre,
    req.body.edad,
    req.body.grupo
]
db.query(q, [values], (err,data) =>{
    if(err) return res.json(err)
return res.json("se postulo bien perro")
})
})

app.post("/folklore", (req, res)=>{
    const q = "INSERT INTO folklore (nombre, edad, grupo) VAlUES (?)"
    const values = [
        req.body.nombre,
        req.body.edad,
        req.body.grupo
    ]
    db.query(q, [values], (err,data) =>{
        if(err) return res.json(err)
    return res.json("se postulo bien perro")
    })
    })

    app.post("/ballet", (req, res)=>{
        const q = "INSERT INTO ballet (nombre, edad, grupo) VAlUES (?)"
        const values = [
            req.body.nombre,
            req.body.edad,
            req.body.grupo
        ]
        db.query(q, [values], (err,data) =>{
            if(err) return res.json(err)
        return res.json("se postulo bien perro")
        })
        })