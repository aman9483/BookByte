const express = require('express');
const router = express.Router();

const { createUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser} = require('../controllers/user');
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/auth');

router.route('/registration').post(createUser);

router.route('/login').post(loginUser);



router.route('/logout').get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);


router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


module.exports = router;
