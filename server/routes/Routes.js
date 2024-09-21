const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/submit',userController.createl);
router.get('/submits',userController.getall);
router.get('/users/:id', userController.getsingle);
router.put('/userupdate/:id',userController.userupdate);
router.delete('/deleteuser/:id',userController.deleteuser)


module.exports = router;