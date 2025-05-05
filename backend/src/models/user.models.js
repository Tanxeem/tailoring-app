import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET } from '../config/serverConfig.js';

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        require:true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    avatar: {
      type: String
    },
    forgotPasswordToken:{
      type: String,
    },
    forgotPasswordTokenExpiry : {
      type: Date,
  },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
    const user = this;
    const hashedPassword = await bcryptjs.hash(user.password, 16);
    user.password = hashedPassword;
    user.avatar = `https://robohash.org/${user.name}`;
  next();
});

// compare password
userSchema.methods.isPasswordMatched = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccesToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    role: this.role,
  }, 
  ACCESS_TOKEN_SECRET, 
  {
    expiresIn: ACCESS_TOKEN_EXPIRY,})
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest('hex');
  const tokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes

  return {
    hashedToken,
    unHashedToken,
    tokenExpiry,
  };
}


const User = mongoose.model('User', userSchema);

export default User;