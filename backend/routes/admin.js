const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const Article = require('../models/Article');
const TeamMember = require('../models/TeamMember');
const ContactForm = require('../models/ContactForm');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ===== CATEGORIES =====

// Get all categories
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Create category
router.post('/categories', auth, async (req, res) => {
  try {
    const { name, slug, translations } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required' });
    }

    // Check for existing slug in legacy or translations
    const langKeys = ['tr', 'en', 'ru', 'ar'];
    const orConditions = [{ slug }];
    if (translations) {
      langKeys.forEach((lk) => {
        if (translations[lk] && translations[lk].slug) {
          const key = `translations.${lk}.slug`;
          orConditions.push({ [key]: translations[lk].slug });
        }
      });
    }

    const existingCategory = await Category.findOne({ $or: orConditions });
    if (existingCategory) {
      return res.status(400).json({ message: 'Slug already exists for one of the languages' });
    }

    const category = new Category({ name, slug, translations });
    await category.save();
    res.status(201).json({ message: 'Category created', data: category });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
});

// Update category
router.put('/categories/:id', auth, async (req, res) => {
  try {
    const { name, slug, translations } = req.body;
    const update = { name, slug };
    if (translations) update.translations = translations;

    const category = await Category.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category updated', data: category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
});

// Delete category
router.delete('/categories/:id', auth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

// ===== ARTICLES =====

// Get all articles
router.get('/articles', auth, async (req, res) => {
  try {
    const articles = await Article.find().populate('category');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// Create article
router.post('/articles', auth, async (req, res) => {
  try {
    const { category, title, slug, image, content, summary, translations } = req.body;

    if (!category || !title || !slug || !content || !summary) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Check for slug collisions in legacy and translations
    const langKeys = ['tr', 'en', 'ru', 'ar'];
    const orConditions = [{ slug }];
    if (translations) {
      langKeys.forEach((lk) => {
        if (translations[lk] && translations[lk].slug) {
          const key = `translations.${lk}.slug`;
          orConditions.push({ [key]: translations[lk].slug });
        }
      });
    }
    const existingArticle = await Article.findOne({ $or: orConditions });
    if (existingArticle) {
      return res.status(400).json({ message: 'Slug already exists for one of the languages' });
    }

    const article = new Article({ category, title, slug, image, content, summary, translations });
    await article.save();
    await article.populate('category');

    res.status(201).json({ message: 'Article created', data: article });
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
});

// Update article
router.put('/articles/:id', auth, async (req, res) => {
  try {
    const { category, title, slug, image, content, summary, translations } = req.body;
    const update = { category, title, slug, image, content, summary };
    if (translations) update.translations = translations;

    const article = await Article.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).populate('category');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article updated', data: article });
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error: error.message });
  }
});

// Delete article
router.delete('/articles/:id', auth, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
});

// ===== TEAM MEMBERS =====

// Get all team members
router.get('/team', auth, async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
});

// Create team member
router.post('/team', auth, upload.single('photo'), async (req, res) => {
  try {
    let { name, title, bio, socialLinks, translations } = req.body;
    let photo = req.body.photo; // In case it's sent as a string (URL)

    if (req.file) {
      photo = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    // Parse JSON fields if they are strings (FormData sends everything as strings)
    if (typeof socialLinks === 'string') {
      try {
        socialLinks = JSON.parse(socialLinks);
      } catch (e) {}
    }
    if (typeof translations === 'string') {
      try {
        translations = JSON.parse(translations);
      } catch (e) {}
    }

    // Allow either legacy fields or translations
    const hasLegacy = name && title && bio;
    const hasTranslations = translations && (translations.tr || translations.en || translations.ru || translations.ar);
    if (!hasLegacy && !hasTranslations) {
      return res.status(400).json({ message: 'Provide legacy fields or translations for team member' });
    }

    const teamMember = new TeamMember({ name, title, photo, bio, socialLinks, translations });
    await teamMember.save();

    res.status(201).json({ message: 'Team member created', data: teamMember });
  } catch (error) {
    res.status(500).json({ message: 'Error creating team member', error: error.message });
  }
});

// Update team member
router.put('/team/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    let { name, title, bio, socialLinks, translations } = req.body;
    let photo = req.body.photo;

    if (req.file) {
      photo = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    // Parse JSON fields
    if (typeof socialLinks === 'string') {
      try {
        socialLinks = JSON.parse(socialLinks);
      } catch (e) {}
    }
    if (typeof translations === 'string') {
      try {
        translations = JSON.parse(translations);
      } catch (e) {}
    }

    const update = { name, title, bio, socialLinks };
    if (photo) update.photo = photo;
    if (translations) update.translations = translations;

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({ message: 'Team member updated', data: teamMember });
  } catch (error) {
    res.status(500).json({ message: 'Error updating team member', error: error.message });
  }
});

// Delete team member
router.delete('/team/:id', auth, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member', error: error.message });
  }
});

// ===== CONTACT FORMS =====

// Get all contact form submissions
router.get('/contacts', auth, async (req, res) => {
  try {
    const contacts = await ContactForm.find().sort({ submissionDate: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact forms', error: error.message });
  }
});

module.exports = router;
