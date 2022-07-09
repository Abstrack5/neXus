const { Thought, User } = require('../models');

const thoughtController = {
    ///api/thoughts
    // GET to get all thoughts
    getAllThoughts(req,res){
        Thought.find({})
        .select('-__v')
        .then(dbThought => res.json(dbThought))
            .catch(err => res.json(err));
    },

    // GET to get a single thought by its _id
    getThoughtById({ params }, res) {
        Thought.findOne(
            { _id: params.id }
        )
        .then(dbThought => {
            if(!dbThought){
                return res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(dbThought);
            }
        })
        .catch(err => res.json(err));
    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    //  /api/thoughts/:userId
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
            )
       })
       .then(dbUser => {
        if(!dbUser) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.json(dbUser);
        }
       })
       .catch(err => res.json(err));
    },


    // /api/thoughts/:thoughtId/reactions
    // POST to create a reaction stored in a single thought's reactions array field

    // DELETE to pull and remove a reaction by the reaction's reactionId value



    // PUT to update a thought by its _id
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true },
        )
        .then((dbThought) => {
            if(!dbThought){
                return res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(dbThought);
            }
        })
        .catch(err => res.json(err));
    },
  

    // DELETE to remove a thought by its _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
        )
        .then(dbThought => {
            if(!dbThought){
                return res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(dbThought);
            }
        })
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;