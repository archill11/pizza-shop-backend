import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js'

export const register = async (req, res) => {
    try {

        // шифруем пароль
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        // создаем документ
        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            fullName: req.body.fullname,
        })

        // сохраняем документ в БД
        const user = await doc.save()

        // создаем токен
        const token = jwt.sign({
            _id: user._id,
        }, 'secretKey123', {expiresIn: '30d'})

        //достаем в переменную userData все кроме пароля
        const userData = user._doc

        // возвращаем информацию о пользователе и сам токен
        res.json({
          userData,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        })
    }
}

export const login = async (req, res) => {
    try {
        // проверяем наличие юзера по email
        const user = await UserModel.findOne({ email: req.body.email })
        if ( !user ) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }

        // проверяем пароль
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if ( !isValidPass ) {
            return res.status(400).json({ message: 'Пароль не верный'})
        }

        // создаем токен
        const token = jwt.sign({
            _id: user._id,
        }, 'secretKey123', {expiresIn: '30d'})

        //достаем в переменную userData все кроме пароля
        const {passwordHash, ...userData} = user._doc

        // возвращаем информацию о пользователе и сам токен
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if ( !user ) {
            return res.status(404).json({ message: 'пользователь не найден' })
        }
         //достаем в переменную userData все кроме пароля
         const userData = user._doc

         // возвращаем информацию о пользователе и сам токен
         res.json(userData)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'нет доступа' })
    }
}

