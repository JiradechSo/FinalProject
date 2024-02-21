const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const SerialNumberController = require('../controllers/SerialNumber-contrller')

router.get('/', authenticate, SerialNumberController.getBySerial)
router.post('/', authenticate, SerialNumberController.createSerial)
router.delete('/:id', authenticate, SerialNumberController.deleteSerialById )
router.get('/count', authenticate, SerialNumberController.getSerialCountByProductId);

module.exports = router