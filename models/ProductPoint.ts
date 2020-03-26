import {Schema, model} from 'mongoose';

const ProductPointSchema = new Schema({
    point: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    product: {
        type: Schema.Types.objectId,
        ref: 'Product',
    },
    user: {
        type: Schema.Types.objectId,
        ref: 'User',
    },
});

const ProductPoint = model('ProductPoint', ProductPointSchema);

export default ProductPoint;
