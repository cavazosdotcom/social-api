const { User, Thought } = require('../models');

// TODO: Add reaction and delete reaction, refactor
module.exports = {
    addReaction(req, res) {
        // Thought.create(req.body)
        // console.log(req.body)
        // find thought by its id, push the request body into that thought's reactions property
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json({message: `Added reaction to thought`})
        )
      .catch((err) => res.status(500).json(err));
  },
    removeReaction(req, res) {
        console.log('You are removing a reaction');
        // find thought by its id, from that thought's reactions array, pull the reactionId and it's body feom reactions
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: {reactionId: req.body.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
};