const express = require('express');
const router = express.Router();

const { CreateBook, getBookDetail, updateBook, deleteBook, getBooks, getAllBooks } = require('../controllers/Book');

const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

router.route('/admin/newBooks').post(isAuthenticatedUser, authorizeRoles("admin"),CreateBook);

router.route('/getAllBooks').get(getAllBooks);

router.route('/getBooks/:id').get(getBookDetail);

router.route('/admin/updateBooks/:id').put(isAuthenticatedUser, authorizeRoles("admin"),updateBook);

router.route('/admin/deleteBooks/:id').delete(isAuthenticatedUser, authorizeRoles("admin"),deleteBook);


module.exports = router;
