const express = require('express');
const router = express.Router();
//require controllers
const formstack =  require(`../../controllers/api/tourdeluce`);

router.get('/', formstack.showAllForms)

router.get('/form/:formId', formstack.showFormById)

router.post('/form/:formId', formstack.postToFormById);

module.exports = router;