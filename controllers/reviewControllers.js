const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Review.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
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