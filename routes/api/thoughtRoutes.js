const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtControllers');

// Set up GET and POST for 'thought' related functions
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one, PUT and Delete
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;
