const mongoose = require("mongoose");
// I don't want to remove a task so I only change status and modifyDate of an entry
const taskSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
    modifyDate: {
        type: Date,
        default: Date.now(),
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;