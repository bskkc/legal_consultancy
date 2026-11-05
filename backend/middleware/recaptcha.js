const axios = require('axios');

const verifyRecaptcha = async (req, res, next) => {
  // Bypass reCAPTCHA for development/testing
  return next();

  /*
  const recaptchaToken = req.body.recaptchaToken;

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA token is required' });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: recaptchaToken,
        },
      }
    );

    if (!response.data.success || response.data.score < 0.5) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying reCAPTCHA' });
  }
  */
};

module.exports = verifyRecaptcha;
