const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: [4, 'Password must be at least 4 characters long.'],
        required: true,
        unique: true,
    },
    Todo: [{
        type: Schema.Types.ObjectId,  //REFERENCING :D
        ref: 'Favorite'
    }],
});

module.exports = mongoose.model('User', UserSchema);
