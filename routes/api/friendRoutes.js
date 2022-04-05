const router = require('express').Router();
// destructures methods to use for routes
const {
    addFriend,
    removeFriend,
  // requires from friendController
  } = require('../../controllers/friendController');
  
  // sets the route parameters and adds above methods for CRUD routes
  router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
  
  
  module.exports = router;
