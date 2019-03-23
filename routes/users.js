// routes/users.js

var express = require('express');
var secured = require('../controllers/admin_panel/middleware');
var router = express.Router();
const auth0 = require('../controllers/util/auth0');
const getUserDeets = require('../controllers/admin_panel/user_tools');
const user_controller = require('../controllers/api/user');

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {

    let id = req.user.id;
    let query = `q=user_id=${id}`;
    let fullProfile = auth0.getUserProfile2(id, query)
   
   fullProfile.then((res) => {
        
        let userProfile = res
            userProfile = userProfile[0];
            req.user = userProfile
            console.log(req.user)
        return userProfile;
    }).then((userProfile) => {
         let name = userProfile.name;
         res.render('partials/user', {user: userProfile, name: name})
    })
 
   //const {_raw, _json, ...userProfile } = req.user;
    
    /* res.render('partials/user', {
       userProfile: JSON.stringify(userProfile, null, 2),
       title: 'profile page'
     }) */
})
   
 
 router.get('/authtoken', user_controller.getAuthToken);
 
 router.get('/getuser/:userId', user_controller.getUserProfile)
 


module.exports = router;