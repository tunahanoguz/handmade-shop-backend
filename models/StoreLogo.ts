import {Schema, model} from 'mongoose';

const StoreLogoSchema = new Schema({
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

const StoreLogo = model('StoreLogo', StoreLogoSchema);

export default StoreLogo;
