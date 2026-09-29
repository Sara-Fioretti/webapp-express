const express = require("express")

const router = express.Router();
const movieController = require ("../controllers/movieController")

//ROTTE INDEX E SHOW

router.get ("/", movieController.index);
router.get("/:id", movieController.show);

module.exports=router;