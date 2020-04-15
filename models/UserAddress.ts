import {Schema, model} from 'mongoose';

const UserAddressSchema = new Schema({
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const UserAddress = model('UserAddress', UserAddressSchema);

export default UserAddress;
