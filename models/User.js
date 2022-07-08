const { Schema, model } = require('mongoose');

const UserSchema = newSchema({
   username: {
    type: String,
    unique: true,
    required: 'Please provide a username',
    trim: true
   },
   email: {
    type: String,
    unique: true,
    required: 'Please provide an email address',
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/]
   },
   thoughts: {

   },
   friends: {
    type: Schema.Types.ObjectId,
    ref: 'User'
   },  
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;