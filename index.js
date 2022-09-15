import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'
import morgan from 'morgan';


import { registerValidation, loginValidation } from './validations.js';
import { UserController, ProductController } from './controllers/index.js';
import { checkAuth, handleValidationErrors } from './utils/index.js'

const port = process.env.PORT || 4444

mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(()=> console.log('DataBase ok'))
    .catch((err) => console.log('DataBase ERR', err))

const app = express()


app.use(morgan('dev'))
app.use(express.json())
app.use(cors())



app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)



app.get('/products', ProductController.getAll)
app.get('/products/:id', ProductController.getOne)
app.post('/orders', checkAuth, ProductController.create)




app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
})