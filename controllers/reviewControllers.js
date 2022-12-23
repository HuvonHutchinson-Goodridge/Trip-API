const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    
    let filter = Object.create(Object.prototype);
    if (req.params.tourId) filter = { tour: req.params.tourId }

    const reviews = await Review.find(filter);

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews
        }
    });
});

exports.getReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id)

    if (!review) {
        return next(new AppError('No review found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});

exports.createReview = catchAsync(async (req, res, next) => {
    //Allows for nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    const newReview = await Review.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});