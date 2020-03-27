import {Schema, model} from 'mongoose';

const StorePointSchema = new Schema({
    score: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const StoreScore = model('StoreScore', StorePointSchema);

export default StoreScore;
