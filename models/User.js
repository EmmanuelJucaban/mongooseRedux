const { Schema, model } = require('mongoose');
const { isEmail, isLength } = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: [isEmail, 'Please enter a valid email address.'],
    required: [true, 'You must provide an email address']
  },
  password: {
    type: String,
    required: [true, 'You must provide a password'],
    validate: [ (value) => isLength(value, { min: 6 }), 'Your password must be at least 6 characters long']
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  todos: [ {type: Schema.Types.ObjectId, ref: 'Todo'} ],
});


UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (e) {
      next(e);
    }
  }
  next();
//  overwrite the plain text password with our hash
});


// The candidate password is the password that the user is providing us when they try to sign in
UserSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;
  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return Promise.resolve(isMatch);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = model('User', UserSchema);
