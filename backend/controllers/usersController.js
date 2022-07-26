'use strict';

const User = require('../model/usersModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    usernameCheck && res.json({ msg: 'Username already used', status: false });
    const emailCheck = await User.findOne({ email });
    emailCheck && res.json({ msg: 'Email already used', status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    user || res.json({
      msg: 'Incorrect username or password', status: false
    });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      delete user.password;
      return res.json({ status: true, user });
    } else {
      return res.json({ msg: 'Incorrect username or password', status: false });
    }
  } catch (ex) {
    next(ex);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      avatarImage,
      isAvatarImageSet: true,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage
    });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User
      .find({ _id: { $ne: req.params.id } })
      .select(['email', 'username', 'avatarImage', '_id']);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
