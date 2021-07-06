const express = require('express');
const {getCourses, getSingleCourse, createCourse, updateCourse, deleteCourse}  = require('../controllers/courseController');

const router = express.Router();

// All routes here are strating with /api/courses

router.get('/', getCourses);

router.get('/:id',getSingleCourse);

router.post('/', createCourse);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse);

module.exports = router;

