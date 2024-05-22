const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction.js');

const thoughtSchema = new Schema({
  thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
  },
  createdAt: {
      type: Date,
      default: Date.now,
      // Query for timestamp
      get: v => v.toString()
  },
  username: {
      type: String,
      required: true,
  },
  reactions: [reactionSchema],
  },
  {
      toJSON: {
          virtuals: true,
          getters: true,
      }
  }
);

const Thought = model('thought', thoughtSchema);

// Gets the length of the thought's reactions
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

module.exports = Thought;