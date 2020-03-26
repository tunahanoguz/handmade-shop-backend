import {Schema, model} from 'mongoose';

const ProductGenderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const ProductGender = model('ProductGender', ProductGenderSchema);

export default ProductGender;
