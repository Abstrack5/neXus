const { User } = require('../models');

const userController = {
    // /api/users
    // GET all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    },

    // GET a single user by its _id and populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .populate({
            path: "friends",
            select: "-__v"
        })
        .select('-__v')
        .then(dbUser => {
            if(!dbUser) {
              return res.status(404).json({ message: 'User not found' });
            } else {
                res.json(dbUser);
            }
        })
        .catch(err => res.json(err));
    },

    // POST a new user:
    createNewUser({ body }, res) {
        User.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    },


    // /api/users/:userId/friends/:friendId
    // POST to add a new friend to a user's friend list
    addFriend({ params }, res){
        User.findOneAndUpdate(
            {_id: params.id},
            {$push: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUser =>{
            if(!dbUser){
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.json(dbUser);
            }
        })
        .catch(err => res.json(err));
    },
    // DELETE to remove a friend from a user's friend list
    removeFriend({ params }, res){
        User.findOneAndUpdate(
            {_id: params.id},
            {$pull: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUser =>{
            if(!dbUser){
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.json(dbUser);
            }
        })
        .catch(err => res.json(err));
    },
    

    // PUT to update a user by its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((dbUser) => {
            if(!dbUser) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.json(dbUser);
            }
        })
        .catch(err => res.json(err));
    },

    // DELETE to remove user by its _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUser => {
            if(!dbUser) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.json(dbUser);
            }
        })
        .catch(err => res.json(err));
    }

    // BONUS: Remove a user's associated thoughts when deleted.
}

module.exports = userController;