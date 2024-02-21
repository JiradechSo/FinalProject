const db = require('../models/db')

exports.getByUser = async (req, res, next) => {
    try {
      const ware = await db.warehouse.findMany({
        where : { userId : req.user.id}
      })
      res.json({ware})
    } catch (err) {
      next(err)
    }
  }

  exports.createWarehouse = async (req, res, next) => {
    // validate req.body
    const data = req.body
    try{
      const rs = await db.warehouse.create({
         data : { ...data, userId : req.user.id}
      })
      res.json({ msg: 'Create OK' , result : rs })
    }catch(err) {
      next(err)
    }
  }

  exports.updateWarehouse = async (req, res, next) => {
    // validate req.params + req.body
    const {id} = req.params
    const data = req.body
    try {
      const rs = await db.warehouse.update({
        data :  {...data},
        where: { id : +id , userId : req.user.id} 
      })
      res.json({msg: 'Update ok', result: rs})
    }catch(err){
      next(err)
    }
  }

  exports.deleteWarehouse = async (req, res, next) => {
    const {id} = req.params
    try {
      const rs = await db.warehouse.delete({ where : {id : +id, userId: req.user.id}})
      res.json({msg: 'Delete ok', result : rs})
    }catch(err) {
      next(err)
    }
  }