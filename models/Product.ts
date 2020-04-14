import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: false,
    },
    colors: {
        type: Array,
        required: false,
    },
    sizes: {
        type: Array,
        required: false,
    },
    createdDate: {
        type: Date,
        default: new Date(),
    },
    updatedDate: {
        type: Date,
        required: false,
        default: new Date(),
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
    },
});

const Product = model('Product', ProductSchema);

export default Product;
