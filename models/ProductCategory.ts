import {Schema, model} from 'mongoose';

const ProductCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const ProductCategory = model('ProductCategory', ProductCategorySchema);

export default ProductCategory;
