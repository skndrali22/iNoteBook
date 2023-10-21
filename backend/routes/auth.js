const express = require('express');
const router = express.Router();

router.get('/' , (req , res)=>{
    obj = {
        aa:'thisos',
        n:34
    }
    res.json(obj);
} )

module.exports = router