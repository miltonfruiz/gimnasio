const { body, validationResult } = require('express-validator');
const rules = [
  body('username').isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
  body('password').isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
];

const validate = (req, res, next) => {
  rules.forEach(rule => rule.run(req));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;