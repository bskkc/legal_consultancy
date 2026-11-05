const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    // legacy fields
    name: { type: String, trim: true },
    title: { type: String, trim: true },
    photo: { type: String },
    bio: { type: String },

    // translations for multilingual content
    translations: {
      tr: {
        name: { type: String, trim: true },
        title: { type: String, trim: true },
        bio: { type: String },
      },
      en: {
        name: { type: String, trim: true },
        title: { type: String, trim: true },
        bio: { type: String },
      },
      ru: {
        name: { type: String, trim: true },
        title: { type: String, trim: true },
        bio: { type: String },
      },
      ar: {
        name: { type: String, trim: true },
        title: { type: String, trim: true },
        bio: { type: String },
      },
    },

    socialLinks: {
      linkedin: String,
      twitter: String,
      email: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);
