import pool from './db'
//runs the server
//Listen for requests from our frontend
//Process them (get books, create users, save favorites)
//espond with data
import express from 'express'
// this is needed for our backend to be able
// to talk to the frontend if they are on 
//different ports like localhost:3000 and
// localhost:5000
import cors from 'cors'
// this one is need to save secret info
//because we are pushing our stuff on github
//and we dont want github to also store and
//passwords and world can see it so we make 
//it like such that we put it in a .env file
//and this import pulls that file
import dotenv from 'dotenv'

// lets you get the password 
//config is the method that you can use on 
//object dotenv
dotenv.config()
//express is a function 
const app = express()
// we are askin to use port stored in the secret env file
// if the port doesnt exist in that file then 
// we use the default 5000 port
const PORT = process.env.PORT || 3001

//express.json() tells your sever to understand JSON

//JSON JSON is the language that 
// frontends and backends use to 
// talk to each other.

//so the data that comes from the 
// frontend is something that backend 
// doesnt understand and it needs translation
// so it uses express.json()

app.use(cors())
app.use(express.json())

// "/" means homepage-the root of the app
// now we wanna wanna do this that if someone
// visits / send back a message
// res=request-> comes from the frontend 
// res=response-> comes from the backend
//gets send back to the front end 
app.get('/',(req, res) => {
    res.json({ message: 'someone visited'})
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

pool.connect()
  .then(() => console.log('Connected to PostgreSQL! 🎉'))
  .catch((err) => console.log('Database connection error:', err))