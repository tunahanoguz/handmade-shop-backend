import {Schema, model} from 'mongoose';

const ProductFavoriteSchema = new Schema({
    date: {
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
});

const ProductFavorite = model('ProductFavorite', ProductFavoriteSchema);

export default ProductFavorite;
