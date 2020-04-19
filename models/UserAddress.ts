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
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    default: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const UserAddress = model('UserAddress', UserAddressSchema);

export default UserAddress;
