const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const productController = require('../controllers/product-controller');

router.get('/', authenticate, productController.getByWarehouseId);
router.post('/', authenticate, productController.createProduct);
router.put('/:id', authenticate, productController.updateProductById);
router.delete('/:id', authenticate, productController.deleteProductById);

module.exports = router;
