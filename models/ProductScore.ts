import {Schema, model} from 'mongoose';

const ProductScoreSchema = new Schema({
    score: {
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

const ProductScore = model('ProductScore', ProductScoreSchema);

export default ProductScore;
