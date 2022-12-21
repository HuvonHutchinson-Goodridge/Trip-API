const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const reviewControllers = require('./../controllers/reviewControllers')

router.route('/')
    .get(authController.protect, reviewControllers.getAllReviews)
    .post(reviewControllers.createReview)

router.route('/:id').get(reviewControllers.getReview);

module.exports = router