const { User, Thought } = require('../models');

module.exports = {
    // from User model, find all and return as json data 
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },    
    // find user by userId, return as json data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    // create user based on req.body
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    // find user by userId, set the new req.body as the data
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    // find user by id and delete, if user is found and deleted, then also delete many thoughts that are in the users thoughts property
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : User.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
    },
};

