const mongoose = require('mongoose');

const fashionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
});

module.exports = mongoose.model('FashionItem', fashionSchema);
