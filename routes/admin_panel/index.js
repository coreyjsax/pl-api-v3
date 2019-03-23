const express = require('express');
const router = express.Router();

//require controllers
const admin_panel_controllers = require('../../controllers/admin_panel/index');
const secured = require('../../controllers/admin_panel/middleware')

router.get('/', admin_panel_controllers.get_admin_index_page);

router.get('/menu-gallery', admin_panel_controllers.get_menu_gallery);



module.exports = router;