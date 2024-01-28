import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: "New"
    },
    lastName: {
        type: String,
        default: "User"
    },
    phone: {
        type: String,
        default: "9999999999"
    },
    id: {
        type: String,
    }
});

UserSchema.pre('save', function (next) {
    this.id = this._id
    next();
});

export const User = mongoose.model('User', UserSchema);
