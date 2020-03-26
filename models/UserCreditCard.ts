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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const UserCreditCard = model('UserCreditCard', UserCreditCardSchema);

export default UserCreditCard;
