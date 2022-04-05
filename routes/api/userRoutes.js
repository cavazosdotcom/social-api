const router = require("express").Router();
// destructures methods to use for routes
const {
  getUsers, 
  getSingleUser, 
  createUser, 
  updateUser, 
  deleteUser,
  // requires from userController
} = require('../../controllers/userController');

// sets the route parameters and adds above methods for CRUD routes
router.route('/')
  .get(getUsers)
  .post(createUser);

// sets the route parameters and adds above methods for CRUD routes
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router;