import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail().withMessage('Неверный E-Mail'),
    body('password', 'Неверный формат пароля').isLength({min: 4}),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Неверный формат пароля').isLength({min: 4}),
]

export const postCreateValidation = [
    body('title', 'Введите заготовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст стать').isLength({min: 5}).isString(),
    body('tags', 'Неверный формат тэгов (укажите строку)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]







