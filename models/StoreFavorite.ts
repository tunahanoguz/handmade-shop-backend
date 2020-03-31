import {Schema, model} from 'mongoose';

const StoreFavoriteSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
});

const StoreFavorite = model('StoreFavorite', StoreFavoriteSchema);

export default StoreFavorite;
