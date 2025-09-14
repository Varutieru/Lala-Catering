const moongoose = require('mongoose');

const orderItemSchema = new moongoose.Schema({
    menu: { type: moongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
});

const orderSchema = new moongoose.Schema({
    userId: { type: moongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderDate: { type: Date, default: Date.now },
    deliverDate: { type: Date, required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' }
});

module.exports = moongoose.model("Order", orderSchema);
