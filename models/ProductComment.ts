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
    productPoint: {
        type: Schema.Types.ObjectId,
        ref: 'ProductPoint',
    },
});

const ProductComment = model('ProductComment', ProductCommentSchema);

export default ProductComment;
