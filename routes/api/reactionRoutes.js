const router = require('express').Router();
// destructures methods to use for routes
const { 
    addReaction, 
    removeReaction,
// requires from reactionController
 } = require('../../controllers/reactionController');
  
  // sets the route parameters and adds above methods for CRUD routes
  router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)
  
  
  module.exports = router;