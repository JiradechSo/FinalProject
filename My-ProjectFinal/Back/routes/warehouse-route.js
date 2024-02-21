const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const warehouseController = require('../controllers/warehouse-controller')

router.get('/', authenticate, warehouseController.getByUser)
router.post('/', authenticate, warehouseController.createWarehouse)
router.put('/:id', authenticate, warehouseController.updateWarehouse)
router.delete('/:id', authenticate, warehouseController.deleteWarehouse )

module.exports = router