// Define Mongoose
// const mongoose = require('mongoose');
const { Schema, Types, model } = require("mongoose");

// date format getter
const dateFormat = (date) => {
    return date.toLocaleString()
};

// Create a new instance of the Mongoose schema to define shape of each document
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // sets the default value to a new ObjectId
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter calling the dateFormat function above
            get: dateFormat,
        },
    },
    {
        toJSON: {
            // allows getters
            getters: true,
        },
        id: false,
    }   
);

// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new Schema(
    {
        thoughtText : {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter calling the dateFormat function above
            get: dateFormat,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    }); 

// Using mongoose.model() to compile a model based on the schema
const Thought = model('Thought', thoughtSchema);

// Thought.create(
//     { thoughtText: 'dfsafasdfasdfeasdf sdfesafdf dsf esaf d feasdf efa sd f', username: 'tina' },
//   (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(data);
//   }
// );


// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

module.exports = Thought;
