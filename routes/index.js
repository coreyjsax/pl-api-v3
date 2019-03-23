// routes/index.js
const express = require('express');
const router = express.Router();
const secured = require('../controllers/admin_panel/middleware');
const auth0 = require('../controllers/util/auth0')
//admin panel controller
const admin_panel_controllers = require('../controllers/admin_panel/index');


/* GET home page. */
router.get('/', secured(), admin_panel_controllers.get_admin_index_page);

router.get('/test', function(req, res){
    let junk = auth0.getFullUser();
    console.log(junk)
    res.json(junk)
    
})


module.exports = router;