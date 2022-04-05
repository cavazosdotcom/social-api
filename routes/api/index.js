// requires each of the api routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

// uses the api routes with these url queries
router.use('/users', userRoutes);
router.use('/users', friendRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/thoughts', reactionRoutes);

module.exports = router;