const db = require("../models");
const Task = db.task;

const sendTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
      active: true,
    }).exec();
    return res.status(200).send({ data: tasks });
  } catch (err) {
    next(err);
  }
};
exports.getTasks = async (req, res, next) => {
  await sendTasks(req, res, next);
};

const updateTask = (prop, value) => (req, res, next) => {
  Task.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        [prop]: value,
        modifyDate: Date.now(),
      },
    },
    { new: true, useFindAndModify: false }
  )
    .exec()
    .then((task) => {
      if (!task) {
        return res.status(400).send({ message: "Task find error " });
      }
      // Get all tasks and send them as a response
      sendTasks(req, res, next);
    })
    .catch(next);
};

exports.markDone = updateTask("completed", true);

exports.markUnDone = updateTask("completed", false);

exports.deActivateTask = updateTask("active", false);

exports.activateTask = updateTask("active", true);

exports.createTask = async (req, res, next) => {
  try {
    let title = req.body.title;
    if (!title) {
      return res.status(400).send({ message: "Task has no title" });
    }
    const task = new Task({
      userId: req.userId,
      title: title,
    });
    await task.save();
    return res.send({ message: "Task created successfully!" });
  } catch (err) {
    next();
  }
};
