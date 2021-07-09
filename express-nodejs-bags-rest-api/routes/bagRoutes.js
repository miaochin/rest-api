const express = require('express');

const { getBags, getSingleBag, createBag, updateBag, deleteBag} = require('../controllers/bagController')

const router = express.Router();

// All routes here are strating with /api/bags

router.get('/', getBags);

router.get('/:id', getSingleBag);

router.post('/', createBag);

router.patch('/:id', updateBag);

router.delete('/:id', deleteBag);

module.exports = router