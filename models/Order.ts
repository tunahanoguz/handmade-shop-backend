import {Schema, model} from 'mongoose';

const OrderSchema = new Schema({
    quality: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
    },
    orderDate: {
        type: Date,
        default: new Date(),
    },
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
});

const Order = model('Order', OrderSchema);

export default Order;
