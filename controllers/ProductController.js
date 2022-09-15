import ProductModel from "../models/Product.js"
// import OrderModel from "../models/Order"




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

// export const create = async (req, res) => {
//     try {
//       console.log(req.body);
//         const doc = new OrderModel(req.body)

//         // const post = await doc.save()
//         // res.json(post)
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Не удалось создать статью' })
//     }
// }


