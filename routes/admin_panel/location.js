const express = require('express');
const router = express.Router();

const admin_location_controller = require('../../controllers/admin_panel/location')
const secured = require('../../controllers/admin_panel/middleware')

router.get('/', admin_location_controller.get_locations)

router.get('/:locId', secured(), admin_location_controller.get_location_by_id)

module.exports = router;