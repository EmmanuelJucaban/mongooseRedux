const router = require('express').Router();
const { addTodo, getAllUserEmails } = require('./../../../controllers/userController');
const { requireAuth } = require('./../../../middlewares/authMiddleware');

// /api/user/todos
router.route('/todos')
  .post(requireAuth, addTodo);

// /api/user/emails
router.get('/emails', getAllUserEmails);

module.exports = router;
