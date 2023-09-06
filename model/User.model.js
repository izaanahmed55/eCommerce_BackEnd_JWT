const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let userSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
});

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next(); 
});

module.exports = mongoose.model('User', userSchema);