// Import model and schema from mongoose
const {model, Schema} = require('mongoose');



const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator(val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig.test(val);
            },
            message: "Please enter correct email address"
        }
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
    toJSON: {
        virtuals: true
    }
})

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('user', userSchema)

module.exports = User
