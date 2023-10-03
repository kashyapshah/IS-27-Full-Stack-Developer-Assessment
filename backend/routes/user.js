var express = require('express');
const { saveuser, getUser, updateUser, deleteUser, bulkInsert } = require('../collection/user');

var router = express.Router();

/* GET users listing. */
router.post('/add', saveuser);

router.get('/',getUser);

router.put('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser);

router.post('/insertMany', bulkInsert)

module.exports = router;
