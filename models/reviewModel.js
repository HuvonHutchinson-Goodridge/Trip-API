// review /rating/ createdAt / reference to tour/ ref to user/

const mongoose = require('mongoose');
const Tour = require('./tourModel')

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

//QUERY MIDDLEWARE

reviewSchema.pre(/^find/, function (next) {
    //this.populate({
    //    path: 'tour',
    //    select: 'name'
    //}).populate({
    //    path: 'user',
    //    select: 'name photo'
    //})

    this.populate({
        path: 'user',
        select: 'name photo'
    })
    next();
})

reviewSchema.statics.calcAverageRatings = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        }, {
            $group: {
                _id: '$tour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }])

    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(
            tourId,
            {
                ratingsQuantity: stats[0].nRating,
                ratingsAverage: stats[0].avgRating
            })
    } else {
        await Tour.findByIdAndUpdate(
            tourId,
            {
                ratingsQuantity: 0,
                ratingsAverage: 4.5
            })
    }


}

reviewSchema.index({ tour: 1, user: 1 }, { unique: true })

reviewSchema.pre(/^findOneAnd/, async function (next) {

    this.r = await this.findOne();
    next();
})

reviewSchema.post(/^findOneAnd/, async function (next) {
    await this.r.constructor.calcAverageRatings(this.r.tour);
})

reviewSchema.post('save', function () {
    //this points to current review
    this.constructor.calcAverageRatings(this.tour);

})

const Review = mongoose.model('Review', reviewSchema);





module.exports = Review;