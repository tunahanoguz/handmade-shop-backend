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
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const ProductScore = model('ProductScore', ProductScoreSchema);

export default ProductScore;
