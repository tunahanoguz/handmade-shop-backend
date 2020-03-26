import {Schema, model} from 'mongoose';

const StoreCoverPictureSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: new Date(),
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
});

const StoreCoverPicture = model('StoreCoverPicture', StoreCoverPictureSchema);

export default StoreCoverPicture;
