// Import model and schema from mongoose
const {model, Schema} = require('mongoose');
const dayjs = require('dayjs')

const thoughtSchema = new Schema({
    thought: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: function(saveDate) {
            return dayjs(saveDate).format('MM/DD/YYYY')
        }
    },

    username: {
        type: String,
        required: true
    },

    reactions: [{}]
}, {
    toJSON: {
        virtuals: true
    }
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought