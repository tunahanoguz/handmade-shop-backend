import {Schema, model} from 'mongoose';

const ProductTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const ProductType = model('ProductType', ProductTypeSchema);

export default ProductType;
