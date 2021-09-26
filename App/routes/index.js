//root router
const express = require('express');
const router = express.Router();

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//GET root (but what we really do is get the books)
router.get('/', (req,res) => {res.send("Server is running!")});

module.exports = router;