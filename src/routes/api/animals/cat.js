const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/", async function (req, res) {

    const user = require("../../../database/models/user");
    if(!req.query.token){
        return res.json({
            error: "Need token."
        });
    }

    let findToken = await user.findOne({ token: req.query.token });
    if(!findToken){
         return res.json({
            error: "Invalid token."
        });
    }

    let x = await fetch('https://imgur.com/r/cat/hot.json')
    .then(res => res.json())
    x = x.data
    let animal = x[Math.floor(Math.random() * x.length)]
    res.json({
        id: animal.id,
        image: `https://i.imgur.com/${animal.hash}${animal.ext}/`,
        author: animal.author,
        score: animal.score,
        filetype: animal.mimetype
    })
});

module.exports = router;
