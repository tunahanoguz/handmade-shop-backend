import {Schema, model} from 'mongoose';

const StoreCommentSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    storeScore: {
        type: Schema.Types.ObjectId,
        ref: 'StoreScore',
    },
});

const StoreComment = model('StoreComment', StoreCommentSchema);

export default StoreComment;
