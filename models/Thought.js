const { Schema, model, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Please provide a reaction to this thought',
        maxLength: 280
    },
    reactionWrittenBy: {
        type: String,
        required: 'Please provide the name of the reactor',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
      getters: true,
    }
  }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Please provide your thoughts',
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    writtenBy: {
        type: String,
        required: 'Please provide the name of this master piece'
    },
    reactions: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;