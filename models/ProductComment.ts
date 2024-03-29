import {Schema, model} from 'mongoose';

const ProductCommentSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    productScore: {
        type: Schema.Types.ObjectId,
        ref: 'ProductScore',
    },
});

const ProductComment = model('ProductComment', ProductCommentSchema);

export default ProductComment;
