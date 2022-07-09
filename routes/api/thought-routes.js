const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//  /api/thoughts/:userId
router
    .route('/:userId')
    .post(createThought);

// /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .post(addReaction)

// // /api/thoughts/:thoughtsId/:reactionId/
router
    .route('/:thoughtsId/:reactionId/')
    .delete(deleteReaction);

module.exports = router;