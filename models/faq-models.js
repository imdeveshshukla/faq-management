import mongoose from 'mongoose';

const { Schema } = mongoose;

const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    hi: { question: String, answer: String },
    bn: { question: String, answer: String }
  },
  createdAt: { type: Date, default: Date.now }
});

faqSchema.methods.getTranslation = function (lang) {
    return this.translations[lang] || { question: this.question, answer: this.answer };
};

// Export as ES module
export default mongoose.model('FAQ', faqSchema);
