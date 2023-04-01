const db = require("../models");
const Status = db.status;
const Task = db.task;
const User = db.user;

//Fill with default values
function populate() {
    Status.find({}).then((result) => {
        if (result.length > 0) {
            console.log('status list fount no need to update');
        } else {
            console.log('not found, creating');
            new Status({
                status: "done"
            }).save()

            new Status({
                status: "undone"
            }).save()

            new Status({
                status: "removed"
            }).save()
        }
    })


}

module.exports = { populate };