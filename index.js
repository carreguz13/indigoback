import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

//npm start to start the express server with nodemon that allow us to re-run the server when we save a change to not put node index.js

    
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
    


//now we need to create the post method because we want to put information into this list in the server with post 
app.post("/bellydance", (req, res)=>{
const q = "INSERT INTO bellydance (nombre, apellido, edad, fecha_de_nacimiento, direccion, grupo, fecha_de_registro) VAlUES (?)"
const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.edad,
    req.body.fecha_de_nacimiento,
    req.body.direccion,
    req.body.grupo,
    req.body.fecha_de_registro
    ]
db.query(q, [values], (err,data) =>{
    if(err) return res.json(err)
return res.json("se postuló bien")
})
})

app.post("/folklore", (req, res)=>{
    const q = "INSERT INTO folklore (nombre, apellido, edad, fecha_de_nacimiento, direccion, grupo, fecha_de_registro) VAlUES (?)"
    const values = [
        req.body.nombre,
    req.body.apellido,
    req.body.edad,
    req.body.fecha_de_nacimiento,
    req.body.direccion,
    req.body.grupo,
    req.body.fecha_de_registro
    ]
    db.query(q, [values], (err,data) =>{
        if(err) return res.json(err)
    return res.json("se postuló bien")
    })
    })



    //now we create the endpoint for delete users in bellydance
app.delete("/bellydance/:id", (req,res)=>{
    const bellydanceId = req.params.id
    const q = "DELETE FROM bellydance WHERE id = ?"

    db.query(q, [bellydanceId], (err,data) => {
        if(err) return res.json(err)
        return res.json("se elimino correctamente")
    } )
})
//now we create the endpoint for delete users in folklore
app.delete("/folklore/:id", (req,res)=>{
    const folkloreId = req.params.id
    const q = "DELETE FROM folklore WHERE id = ?"

    db.query(q, [folkloreId], (err,data) => {
        if(err) return res.json(err)
        return res.json("se elimino correctamente")
    } )
})

//this endpoint its for edit the bellydance array and folcklore
app.put("/bellydance/:id", (req,res)=>{
    const bellydanceId = req.params.id
    const q = "UPDATE bellydance SET `nombre`= ?, `apellido`= ?, `edad`= ?, `fecha_de_nacimiento`= ?, `direccion`= ?, `grupo`= ?, `fecha_de_registro`= ? WHERE id = ?"

    const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.edad,
    req.body.fecha_de_nacimiento,
    req.body.direccion,
    req.body.grupo,
    req.body.fecha_de_registro
    ]

    db.query(q, [...values, bellydanceId], (err,data) => {
        if(err) return res.json(err)
        return res.json("se editó correctamente")
    } )
})

app.put("/folklore/:id", (req,res)=>{
    const folkloreId = req.params.id
    const q = "UPDATE folklore SET `nombre`= ?, `apellido`= ?, `edad`= ?, `fecha_de_nacimiento`= ?, `direccion`= ?, `grupo`= ?, `fecha_de_registro`= ? WHERE id = ?"

    const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.edad,
    req.body.fecha_de_nacimiento,
    req.body.direccion,
    req.body.grupo,
    req.body.fecha_de_registro
    ]

    db.query(q, [...values, folkloreId], (err,data) => {
        if(err) return res.json(err)
        return res.json("se editó correctamente")
    } )
})

