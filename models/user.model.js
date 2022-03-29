import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});


const User = mongoose.model('User', userSchema);
export default User;