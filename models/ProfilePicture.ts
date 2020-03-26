import {Schema, model} from 'mongoose';

const ProfilePictureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const ProfilePicture = model('ProfilePicture', ProfilePictureSchema);

export default ProfilePicture;
