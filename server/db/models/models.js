const mongoose = require('mongoose');

const users = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    released : {
        type : String,
        required : true,
    },
     price: {
        type : String,
        required : true,
    },
    witer: {
        type : String,
        required : true,
    },
    cover : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    reviews : {
        type : Number,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    about : {
        type : String,
        required : true,
    }
});

 let add= mongoose.model("users", users);
 module.exports = add