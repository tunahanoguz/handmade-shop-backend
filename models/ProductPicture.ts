import {Schema, model} from 'mongoose';

const ProductPictureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
});

const ProductPicture = model('ProductPicture', ProductPictureSchema);

export default ProductPicture;
