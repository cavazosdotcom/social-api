// Define Mongoose
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const { Schema, Types, model } = require("mongoose");
// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
              },
              message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }   
);

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    }); 

// Using mongoose.model() to compile a model based on the schema
const User = mongoose.model('User', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

module.exports = User;