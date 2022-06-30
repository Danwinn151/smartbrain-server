const handleImage =  (req, resp, db) => {
    const { id } = req.body
   db("users").where('id', "=", id)
   .increment('entries', 1)
   .returning("entries")
   .then(entries => {
    resp.json(entries[0])
   })
   .catch(() => {
    resp.json("invalid id")
   })
}

module.exports = {
    handleImage: handleImage
}