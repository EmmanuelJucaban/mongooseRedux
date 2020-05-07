const router = require('express').Router();
const { addTodo } = require('./../../../controllers/userController');

// /api/user/todos
router.route('/todos')
  .post(addTodo);

module.exports = router;