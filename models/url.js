const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: { 
        type: String,
        unique: true,
    },
    originalUrl: String,
},
{ timestamps: true },
);

module.exports = mongoose.model("Url", urlSchema);