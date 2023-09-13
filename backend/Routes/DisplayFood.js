const express = require("express");
const router = express.Router();

router.post(process.env.REACT_APP_FOOD_DATA_URL, (req,res) => {
    try {
        res.send([global.food_items,global.food_categories])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
})
module.exports = router;