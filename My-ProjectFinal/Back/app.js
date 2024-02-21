require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const warehouseRoute = require('./routes/warehouse-route')
const productRoute = require('./routes/product-route')
const uploadRouter = require('./routes/upload-route');
const SerialRouter = require('./routes/SerialNumber-route')
const path = require('path');

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// service
app.use('/auth', authRoute)
app.use('/ware', warehouseRoute)
app.use('/product', productRoute)
app.use('/upload', uploadRouter)
app.use('/serial',SerialRouter)



// notFound
app.use( notFound )

// error
app.use(errorMiddleware)

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on Port :', port))