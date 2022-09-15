import ProductModel from "../models/Product.js"
import OrderModel from "../models/Order.js"




export const getAll = async (req, res) => {
let category = undefined
let sortBy = undefined
const limit = req.query.limit
    try {
        if ( req.query.category ) {
          category = {category: req.query.category}
        }
        if ( req.query.sortBy && req.query.sortBy === 'rating' ) {
          sortBy = {"rating": -1}
        }
        if ( req.query.sortBy && req.query.sortBy === 'price' ) {
          sortBy = {"price.0": 1}
        }
        if ( req.query.sortBy && req.query.sortBy === 'priceDesc' ) {
          sortBy = {"price.0": -1}
        }
        const posts = await ProductModel.find(category).limit(limit).sort(sortBy).exec();
    
        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось получить статьи' })
    }
}

export const getOne = async (req, res) => {
    try {
      const postId = req.params.id
      ProductModel.findOne(
        {
            _id: postId,
        }, 
        (err, doc) => {
          if ( err) {
              console.log(err);
              return res.status(500).json({ message: 'Не удалось получить продукт' })
          }
          if ( !doc ) {
              return res.status(404).json({ message: 'продукт не неайдена' })
          }

          res.json(doc)
        }
      )

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Не удалось получить продукты' })
    }
}

export const create = async (req, res) => {
    try {
        console.log(req.body);

        const lastOrder = await OrderModel.findOne({user: req.user}).sort({ createdAt: -1 })
        const maxOrder = lastOrder ? lastOrder.order : 0
      console.log(req.body.list);
        const doc = new OrderModel({
          list: req.body.list,
          user: req.user,
          total: req.body.list.reduce((sum, curr) => curr.price * curr.count + sum, 0),
          order: maxOrder + 1
        })
        // сохраняем документ в БД
        const order = await doc.save()

        res.json(order)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось создать заказ' })
    }
}


