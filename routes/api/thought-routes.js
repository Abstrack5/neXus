const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

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

// // /api/thoughts/:thoughtsId/reactions/
// router
//     .route('/:thoughtsId/reactions/')
//     .post()
//     .delete();

module.exports = router;