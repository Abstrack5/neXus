const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

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
}
)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = User;