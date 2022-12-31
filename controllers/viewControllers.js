const Tour = require('./../models/tourModel')
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync( async (req, res, next) => {

    //Get the tour data from the collection
    const tours = await Tour.find();
    //Build template 

    //Render that template using the tour data from first step

    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    })
})

exports.getTour = catchAsync( async (req, res, next) => {
    res.status(200).render('tour', {
        title: 'The Forest Hiker'
    })
})