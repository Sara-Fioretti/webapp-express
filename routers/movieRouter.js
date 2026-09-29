const express = require("express")

const router = express.Router();
const movieController = require ("../controllers/movieController")
const imagePath = require('../middlewares/imagePath'); 

//ROTTE INDEX E SHOW

router.get ("/", imagePath, movieController.index);
router.get("/:id", imagePath, movieController.show);

module.exports=router;