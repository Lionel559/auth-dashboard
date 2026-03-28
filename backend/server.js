
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())

const SECRET = "mysecretkey"

/* temporary users storage */
let users = []

/* REGISTER */

app.post("/register", async (req,res)=>{

const {name,email,password} = req.body

const hashedPassword = await bcrypt.hash(password,10)

const newUser = {
id:Date.now(),
name,
email,
password:hashedPassword
}

users.push(newUser)

res.json({message:"Registration successful"})

})

/* LOGIN */

app.post("/login", async (req,res)=>{

const {email,password} = req.body

const user = users.find(u => u.email === email)

if(!user){
return res.status(400).json({message:"User not found"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(400).json({message:"Wrong password"})
}

const token = jwt.sign(
{id:user.id,name:user.name},
SECRET,
{expiresIn:"1h"}
)

res.json({token})

})

/* PROFILE */

app.get("/profile",(req,res)=>{

const token = req.headers.authorization

if(!token){
return res.status(401).json({message:"Access denied"})
}

try{

const verified = jwt.verify(token,SECRET)

res.json({user:verified})

}catch{

res.status(401).json({message:"Invalid token"})

}

})

/* GET ALL USERS */

app.get("/users",(req,res)=>{

const cleanUsers = users.map(u => ({
id:u.id,
name:u.name,
email:u.email
}))

res.json(cleanUsers)

})

/* DELETE USER */

app.delete("/users/:id",(req,res)=>{

const id = parseInt(req.params.id)

users = users.filter(u => u.id !== id)

res.json({message:"User deleted"})

})

/* UPDATE USER */

app.put("/users/:id",(req,res)=>{

const id = parseInt(req.params.id)

const {name,email} = req.body

users = users.map(u =>
u.id === id ? {...u,name,email} : u
)

res.json({message:"User updated"})

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})