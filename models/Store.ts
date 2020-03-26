import {Schema, model} from 'mongoose';

const StoreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Store = model('Store', StoreSchema);

export default Store;
