import mongoose, {Model} from "mongoose";
import bcrypt from "bcrypt";
import {UserFields} from "../types";

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
}

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return;
    }
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);

export default User;