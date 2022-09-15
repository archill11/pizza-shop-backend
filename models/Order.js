import mongoose from 'mongoose';

// const OrderSchema = new mongoose.Schema({
//         count: {
//             type: Number,
//             required: true,
//         },
//         title: {
//             type: String,
//             required: true,
//         },
//         type: {
//             type: String,
//         },
//         size: {
//             type: Number,
//             required: true,
//         },
//         price: {
//             type: Number,
//             required: true,
//         },
//         imageUrl: {
//           type: String,
//           required: true,
//         },
//     },
//     {
//         timestamps: true,
//     },
// );
const OrderSchema = new mongoose.Schema([],
    {
        timestamps: true,
    },
);

export default mongoose.model('Order', OrderSchema)