const handleRegister =  (req, resp, db, bcrypt) => {
    const {email, name, password} = req.body
    console.log(email)
    console.log(name)
    console.log(password)
    const hash = bcrypt.hashSync(password)

    db.transaction(trx => {
        trx.insert({
            email:email,
            hash: hash
        })
        .into("login")
        .returning('email')
        .then(LoginEmail => {
           return trx('users').insert({
                name: name,
                email: LoginEmail[0].email,
                joined: new Date ()
            })
            .returning('*')
            .then(data => {
                resp.json(data[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(() => {
        resp.status(400).json('invalid register')
    })
}

module.exports = {
    handleRegister: handleRegister
}
