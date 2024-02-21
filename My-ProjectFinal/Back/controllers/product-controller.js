const db = require('../models/db');

exports.getByWarehouseId = async (req, res, next) => {
    try {
        const { WarehouseId } = req.query;
        const products = await db.product.findMany({
            where: {
                WarehouseId: parseInt(WarehouseId)
            }
        });
        res.json({ products });
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const { WarehouseId } = req.query;
        if (!WarehouseId) {
            return res.status(400).json({ message: 'WarehouseId is required' });
        }

        const newProduct = await db.product.create({
            data: { ...data, WarehouseId: Number(WarehouseId) }
        });
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        next(error);
    }
};

exports.updateProductById = async (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const data = req.body;
        const updatedProduct = await db.product.update({
            where: { id: productId },
            data: { ...data }
        });
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        next(error);
    }
};

exports.deleteProductById = async (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        await db.product.delete({
            where: { id: productId }
        });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};



