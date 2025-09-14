const moongoose = require('mongoose');

const menuSchema = new moongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    schedule: [{
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }]
});

module.exports = moongoose.model("Menu", menuSchema);