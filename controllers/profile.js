const handlerProfile =  (req, resp, db) => {
    console.log(req.params)
    const { id } = req.params
    db.select("*").from ('users').where({
        id: id
    })
    .then(userWiththeId => {
        if(userWiththeId.length){
        resp.json((userWiththeId[0]))
        }
        else{
            resp.status(404).json("404 not found");
        }
    })
}

module.exports ={
    handlerProfile:handlerProfile
}