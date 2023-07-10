const router = require('express').Router();
const { userInfoValidation, userAvatarValidation, userIdValidation } = require('../middlewares/validationJoi');

const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', userIdValidation, getUserById);
router.patch('/me', userInfoValidation, updateUserInfo);
router.patch('/me/avatar', userAvatarValidation, updateUserAvatar);

module.exports = router;
