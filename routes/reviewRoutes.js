const express = require('express');
const router = express.Router({mergeParams: true});
const authController = require('./../controllers/authController');
const reviewControllers = require('./../controllers/reviewControllers')

router.use(authController.protect);

router.route('/')
    .get(reviewControllers.getAllReviews)
    .post(
        authController.restrictTo('user'),
        reviewControllers.setTourUserIds,
        reviewControllers.createReview)

router.route('/:id').get(reviewControllers.getReview).delete(authController.restrictTo('user', 'admin'), reviewControllers.deleteReview).patch(authController.restrictTo('user', 'admin'), reviewControllers.updateReview);

module.exports = router