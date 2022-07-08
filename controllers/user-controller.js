const { User } = require('../models');

const userController = {
    // /api/users
    // GET all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    },
    // GET a single user by its _id and populated thought and friend data
    
    // POST a new user:



    // /api/users/:userId/friends/:friendId
    // POST to add a new friend to a user's friend list

    // DELETE to remove a friend from a user's friend list

    

    // PUT to update a user by its _id

    // DELETE to remove user by its _id

    // BONUS: Remove a user's associated thoughts when deleted.
}

module.exports = userController;