const mongoose = require("mongoose");
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;
const Post = require("./post");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: "subscriber"
    }
});

/**
 * Virtual fields are additional fields for a given model.
 * Their values can be set manually or automatically with defined functionality.
 * Keep in mind: virtual properties (password) don’t get persisted in the database.
 * They only exist logically and are not written to the document’s collection.
 */

// virtual field

userSchema
    .virtual('password')
    .set(function(password) {
        // create a temporarity variable called _password
        this._password = password;
        // generate salt
        this.salt = this.makeSalt();
        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });
 
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
 
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
 
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};
 
module.exports = mongoose.model('User', userSchema);