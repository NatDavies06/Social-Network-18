const { Thought } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};

module.exports = thoughtController;
