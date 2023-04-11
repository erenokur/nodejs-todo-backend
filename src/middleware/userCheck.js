const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (user) {
      if (user.username === req.body.username) {
        return res
          .status(400)
          .send({ message: "Failed! Username is already in use!" });
      } else {
        return res
          .status(400)
          .send({ message: "Failed! Email is already in use!" });
      }
    }
    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const userCheck = {
  checkDuplicateUsernameOrEmail,
};
module.exports = userCheck;
