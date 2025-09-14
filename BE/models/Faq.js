const moongoose = require('mongoose');

const faqSchema = new moongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

module.exports = moongoose.model("FAQ", faqSchema);