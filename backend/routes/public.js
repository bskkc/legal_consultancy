const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Article = require('../models/Article');
const TeamMember = require('../models/TeamMember');
const ContactForm = require('../models/ContactForm');
const verifyRecaptcha = require('../middleware/recaptcha');

// Helper to localize an object with translations
const localize = (obj, lang, fields) => {
  if (!obj) return obj
  const out = obj.toObject ? obj.toObject() : { ...obj }
  fields.forEach((f) => {
    const legacy = out[f]
    const t = out.translations && out.translations[lang] && out.translations[lang][f]
    if (t) out[f] = t
    if (!out[f] && typeof legacy === 'undefined') out[f] = ''
  })
  return out
}

// Get all categories (localized via ?lang=)
router.get('/categories', async (req, res) => {
  try {
    const limit = req.query.limit || 0;
    const lang = req.query.lang || 'tr'
    const categories = await Category.find().limit(parseInt(limit));
    const localized = categories.map((c) => localize(c, lang, ['name', 'slug']))
    res.json(localized);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Get articles by category slug
router.get('/articles/category/:slug', async (req, res) => {
  try {
    const lang = req.query.lang || 'tr';
    // Try legacy slug or translations for requested language
    const orConditions = [{ slug: req.params.slug }];
    orConditions.push({ [`translations.${lang}.slug`]: req.params.slug });
    const category = await Category.findOne({ $or: orConditions });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const articles = await Article.find({ category: category._id }).populate('category');
    const localized = articles.map((a) => {
      const art = localize(a, lang, ['title', 'slug', 'summary', 'content']);
      if (art.category) art.category = localize(art.category, lang, ['name', 'slug']);
      return art;
    });
    res.json(localized);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// Get article by slug
router.get('/articles/:slug', async (req, res) => {
  try {
    const lang = req.query.lang || 'tr';
    const orConditions = [{ slug: req.params.slug }];
    orConditions.push({ [`translations.${lang}.slug`]: req.params.slug });
    const article = await Article.findOne({ $or: orConditions }).populate('category');
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    const localized = localize(article, lang, ['title', 'slug', 'summary', 'content']);
    if (localized.category) localized.category = localize(localized.category, lang, ['name', 'slug']);
    res.json(localized);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
});

// Get all team members
router.get('/team', async (req, res) => {
  try {
    const lang = req.query.lang || 'tr';
    const teamMembers = await TeamMember.find();
    const localized = teamMembers.map((m) => localize(m, lang, ['name', 'title', 'bio']));
    res.json(localized);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
});

// Get team member by id (localized via ?lang=)
router.get('/team/:id', async (req, res) => {
  try {
    const lang = req.query.lang || 'tr';
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Team member not found' });
    const localized = localize(member, lang, ['name', 'title', 'bio']);
    res.json(localized);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team member', error: error.message });
  }
});

// Submit contact form (with reCAPTCHA verification)
router.post('/contact', verifyRecaptcha, async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const ipAddress = req.ip;

    const contactForm = new ContactForm({
      name,
      email,
      message,
      phone,
      ipAddress,
    });

    await contactForm.save();
    res.status(201).json({ message: 'Contact form submitted successfully', data: contactForm });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form', error: error.message });
  }
});

module.exports = router;
