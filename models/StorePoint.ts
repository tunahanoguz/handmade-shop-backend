import {Schema, model} from 'mongoose';

const StorePointSchema = new Schema({
    point: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    store: {
        type: Schema.Types.objectId,
        ref: 'Store',
    },
    user: {
        type: Schema.Types.objectId,
        ref: 'User',
    },
});

const StorePoint = model('StorePoint', StorePointSchema);

export default StorePoint;
