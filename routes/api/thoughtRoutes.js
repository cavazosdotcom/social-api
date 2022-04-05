const router = require("express").Router();
// destructures methods to use for routes
const {
  getThoughts, 
  getSingleThought, 
  createThought, 
  updateThought, 
  deleteThought,
// requires from thoughtController
} = require('../../controllers/thoughtController');

// sets the route parameters and adds above methods for CRUD routes
router.route('/')
  .get(getThoughts)
  .post(createThought);

  // sets the route parameters and adds above methods for CRUD routes
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;

