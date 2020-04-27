const express = require('express')


const userCtrl = require('../controllers/user');
const authCtrl = require('../controllers/auth');

const router = express.Router();


router.get('/api/users',userCtrl.list)

router.put('/api/users',userCtrl.create)


router.get('/api/users/:userId',authCtrl.requireSignin,userCtrl.read);

router.put(authCtrl.requireSignin,authCtrl.hasAuthorization, userCtrl.update)

router.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)



router.param('userId', userCtrl.userById)


module.exports = router