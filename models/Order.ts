import {Schema, model} from 'mongoose';

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'UserAddress',
    },
    orderDate: {
        type: Date,
        default: new Date(),
    },
    quality: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: false,
    },
    size: {
        type: Number,
        required: false,
    },
});

const Order = model('Order', OrderSchema);

export default Order;
