const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minLength: [5, 'Username is too short'],
    validate: {
      validator: function (value) {
        return /^[A-Za-z0-9]+$/.test(value);
      },
      message: 'Password must contain only A-Z, a-z or 0-9 characters'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (value) {
        return /^[A-Za-z0-9]+$/.test(value);
      }
    },
    minLength: [8, 'Password is too short'],
  },
});

userSchema.virtual('repeatPassword')
  .set(function (value) {
    if (value !== this.password) {
      throw new Error('Password missmatch!');
    }
  });

userSchema.pre('save', async function () {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;