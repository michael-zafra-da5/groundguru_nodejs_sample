import mongoose from 'mongoose';

var userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: 'This field is required'
        },
        last_name: {
            type: String,
            required: 'This field is required'
        },
        email: {
            type: String,
            required: 'This field is required'
        },
        password: {
            type: String,
            required: 'This field is required'
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;