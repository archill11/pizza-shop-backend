import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        types: {
            type: Array,
            default: [0]
        },
        sizes: {
            type: Array,
            default: []
        },
        price: {
            type: Array,
            default: []
        },
        category: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Product', ProductSchema)