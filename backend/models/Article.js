const mongoose = require('mongoose');

const contentTranslationSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    slug: { type: String, lowercase: true, trim: true },
    summary: { type: String, trim: true },
    content: { type: String },
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    // Legacy single-language fields (kept for backward compatibility)
    title: { type: String, trim: true },
    slug: { type: String, lowercase: true, trim: true },
    image: { type: String },
    content: { type: String },
    summary: { type: String, trim: true },

    // Translations for multiple languages
    translations: {
      tr: { type: contentTranslationSchema, default: {} },
      en: { type: contentTranslationSchema, default: {} },
      ru: { type: contentTranslationSchema, default: {} },
      ar: { type: contentTranslationSchema, default: {} },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
