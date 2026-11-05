const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    slug: { type: String, lowercase: true, trim: true },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    // Legacy single-language fields (kept for backward compatibility)
    name: { type: String, trim: true },
    slug: { type: String, lowercase: true, trim: true },

    // Icon for the category
    icon: { type: String, trim: true },

    // Translations object for multilingual support
    translations: {
      tr: { type: translationSchema, default: {} },
      en: { type: translationSchema, default: {} },
      ru: { type: translationSchema, default: {} },
      ar: { type: translationSchema, default: {} },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
