// requires for mongoose
const { Schema, Types, model } = require("mongoose");
// Create a new instance of userSchema
const userSchema = new Schema(
    {
        // user's username
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // user's email
        email: {
            type: String,
            required: true,
            unique: true,
            // validates the users email address is an email
            validate: {
                validator: function (valid) {
                  return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(valid);
                },
                message: (props) => `${props.value} is not a valid email address!`,
              },
        },
        // array to store user's thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        // array to store user's friends
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

// virtual for userSchema to return the count of the users total amount of friends
userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    }); 

// Using mongoose.model() to compile a model based on the schema
const User = model('User', userSchema);


// User.create(
//     { username: 'newUser', email: 'fake@hotmail.com' },
//   (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(data);
//   }
// );



// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

module.exports = User;