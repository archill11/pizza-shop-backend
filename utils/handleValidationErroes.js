import { validationResult } from 'express-validator';

export default (req, res, next) => {
    // проверяем что нету никаких ошибок
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    next()
}