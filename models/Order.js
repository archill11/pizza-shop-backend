import mongoose, { Schema } from 'mongoose';

const OrderSchema = new mongoose.Schema({
    order: {
      type: Number,
      required: true
    },
    list: [
      {
        count: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
        },
        size: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
      }
    ],
    total: {
      type: String,
      required: true,
    },
    user: {
      ref: 'user',
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema)