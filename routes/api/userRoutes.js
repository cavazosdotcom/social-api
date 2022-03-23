const router = require("express").Router();

const {
  getUsers, getSingleUser, createUser,
  
} = require('../../controllers/userController');

// Attaching `getUsers` function to GET requests to this route, and `createUser` function to POST requests to this route.
router.route('/').get(getUsers).post(createUser);
// router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);
// Attaching `getSingleUser` function to GET requests to this route, `updateUser` function to PUT reqeusts to this route, and `deleteUser` function to DELETE requests to this route.
// router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

module.exports = router;