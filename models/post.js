const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports=mongoose.model('Post',postSchema);
//collection name will be plural form of Name Post