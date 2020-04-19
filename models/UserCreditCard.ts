import {Schema, model} from 'mongoose';

const UserCreditCardSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    },
    expiryMonth: {
        type: Number,
        required: true,
    },
    expiryYear: {
        type: Number,
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

const UserCreditCard = model('UserCreditCard', UserCreditCardSchema);

export default UserCreditCard;
