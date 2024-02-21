const db = require('../models/db');
const { Status } = require('@prisma/client');

exports.getBySerial = async (req, res, next) => {
    try {
        const { ProductId } = req.query;
        const SerialNumber = await db.SerialNumber.findMany({
            where: {
                ProductId: parseInt(ProductId)
            }
        });
        res.json({ SerialNumber });
    } catch (err) {
        next(err);
    }
};

exports.createSerial = async (req, res, next) => {
    try {
        const data = req.body;
        const { ProductId } = req.query;
        if (!ProductId) {
            return res.status(400).json({ message: 'ProductId is required' });
        }

        const newSerial = await db.SerialNumber.create({
            data: { ...data, ProductId: Number(ProductId) }
        });
        res.status(201).json({ message: 'Serial created successfully', SerialNumber: newSerial });
    } catch (error) {
        next(error);
    }
};

exports.deleteSerialById = async (req, res, next) => {
    try {
        const SerialID = parseInt(req.params.id);
        await db.SerialNumber.delete({
            where: { id: SerialID }
        });
        res.status(200).json({ message: 'Serial deleted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getSerialCountByProductId = async (req, res, next) => {
    try {
        const { ProductId } = req.query;
        // ทำการค้นหา Serial Number ที่เชื่อมโยงกับ ProductId นี้
        const serialNumbers = await db.SerialNumber.findMany({
            where: {
                ProductId: parseInt(ProductId)
            }
        });
        // นับจำนวน Serial Number ที่ได้รับ
        const serialCount = serialNumbers.length;
        // ส่งผลลัพธ์กลับให้กับผู้ใช้
        res.json({ serialCount });
    } catch (error) {
        next(error);
    }
};
