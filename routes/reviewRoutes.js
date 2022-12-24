const express = require('express');
const router = express.Router({mergeParams: true});
const authController = require('./../controllers/authController');
const reviewControllers = require('./../controllers/reviewControllers')

router.route('/')
    .get(authController.protect, reviewControllers.getAllReviews)
    .post(authController.protect,
        authController.restrictTo('user'),
        reviewControllers.setTourUserIds,
        reviewControllers.createReview)

router.route('/:id').get(reviewControllers.getReview).delete(reviewControllers.deleteReview).patch(reviewControllers.updateReview);

module.exports = router