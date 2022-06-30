
const express = require("express");
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");



const register = require('./controllers/Register')
const signin = require('./controllers/Signin')
const profile = require('./controllers/profile')
const image = require("./controllers/image")


const app = express();

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl  : true,
    }
  });



app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, resp) = resp.send("it's working"))
app.post("/signin", (req, resp) => {signin.HandlerSignin(req, resp, db, bcrypt)})
app.post('/register',(req, resp) => { register.handleRegister(req, resp, db, bcrypt)})
app.get("/profile/:id",(req, resp) => {profile.handlerProfile(req, resp, db)})
app.put('/image',(req, resp) => {image.handlerImage(req, resp, db)})


app.listen(process.env.PORT  || 3000, () => {
    console.log(`browser is running in ${process.env.PORT}`)
})
