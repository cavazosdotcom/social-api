const { User, Thought } = require('../models');
// TODO: finish create thought, add update and delete by id
module.exports = {
    // from the Thought model, find all, and show the response data as json data for insomnia
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },    

    // from the Thought model, find on thought based on the query parameter's thoughtId
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    // TODO: Validate username matches user_id in thought creation
    // from the Thought model, create a new thought from the req.body
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          // after creating thought, find the user by their id, and push the created thought into that users thoughts property based on its new thoughtId
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought created, but found no user with username',
              })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // from the thought model, find a thought by its id, and set the req.body as the new data
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // from the Thought model, find by id, and delete
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'Thought deleted!' })
            // : Thought.deleteOne({ _id: thoughtId })
        )
        // .then(() => res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
};