const express = require('express');
const viewController = require('./../controllers/viewControllers')
const router = express.Router();

router.get('/', viewController.getOverview)
router.get('/tour', viewController.getTour)
router.get('/tour/:slug', viewController.get)

module.exports = router