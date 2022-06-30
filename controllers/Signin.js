const HandlerSignin = (req, resp, db, bcrypt) => { 
    const {email, password} = req.body
 db.select('email', 'hash').from('login')
 .where('email', '=', email)
 .then(data => {
   const isvalid = bcrypt.compareSync(password, data[0].hash)
   console.log(isvalid)
  if(isvalid){
      db.select('*').from('users')
      .where('email', '=', email)
      .then(user => {
        resp.json(user[0])
      })
    .catch(() => {
        resp.status(400).json('wrong credientials')
    })
  }
  else{
    resp.status(400).status('unable to register')
  }
 })
}

module.exports = {
    HandlerSignin:HandlerSignin
}