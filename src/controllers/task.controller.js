const db = require("../models");
const Task = db.task;


exports.getTasks = (req, res) => {
    Task.find(
        {
            userId: req.userId,
            active: true
        }).then(
            (tasks) => {
                res.send({ data: tasks });
                return;
            }
        ).catch(err => {
            res.status(500).send({ message: "Task find error " + err })
        });
};

exports.markDone = (req, res) => {
    Task.findById(
        req.body._id
    ).then(
        (task) => {

            if (!task) {
                res.status(500).send({ message: "Task find error " });
            }
            task.completed = true;
            task.modifyDate = Date.now();
            task.save()
                .then(task => {
                    res.send(task);
                })
                .catch(err => {
                    res.status(500).send({ message: "Task save error " + err })
                });
        }
    ).catch(err => {
        res.status(500).send({ message: "Task done error " + err });
    });
};

exports.markUnDone = (req, res) => {
    Task.findById(
        req.body._id
    ).then(
        (task) => {
            if (!task) {
                res.status(500).send({ message: "Task find error " });
            }
            task.completed = false;
            task.modifyDate = Date.now();
            task.save()
                .then(task => {
                    res.send(task);
                })
                .catch(err => {
                    res.status(500).send({ message: "Task save error " + err })
                });
        }
    ).catch(err => {
        res.status(500).send({ message: "Task undone error " + err });
    });
};

exports.deActivateTask = (req, res) => {
    Task.findById(
        req.body._id
    ).then(
        (task) => {
            if (!task) {
                res.status(500).send({ message: "Task find error " });
            }
            task.active = false;
            task.modifyDate = Date.now();
            task.save()
                .then(task => {
                    res.send(task);
                })
                .catch(err => {
                    res.status(500).send({ message: "Task save error " + err })
                });
            return;
        }
    ).catch(err => {
        res.status(500).send({ message: "Task deactivation error " + err });
    });
};

exports.activateTask = (req, res) => {
    Task.findById(
        req.body._id
    ).then(
        (task) => {
            if (!task) {
                res.status(500).send({ message: "Task find error " });
            }
            task.active = true;
            task.modifyDate = Date.now();
            task.save()
                .then(task => {
                    res.send(task);
                })
                .catch(err => {
                    res.status(500).send({ message: "Task save error " + err })
                });
            return;
        }
    ).catch(err => {
        res.status(500).send({ message: "Task activation error " + err });
    });
};


exports.createtask = (req, res) => {
    let title = req.body.title
    if (title) {
        const task = new Task({
            userId: req.userId,
            title: req.body.title,
        });
        task.save()
            .then(task => {
                res.send({ message: "Task created successfully!" });
            })
            .catch(err => {
                res.status(500).send({ message: "Task create error " + err });
            });
    } else {
        res.status(500).send({ message: "Task has no title " });
    }

};

