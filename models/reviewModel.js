// review /rating/ createdAt / reference to tour/ ref to user/

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    review: {
        type: String,
        required: [true, 'You must input a review'],
        maxLength: [140, 'A review can have at most 140 characters'],
        minLength: [20, 'A review must have at least 20 characters']
    },
    rating: {
        type: Number,
        required: [true, 'You must give a rating'],
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must have an author']
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;