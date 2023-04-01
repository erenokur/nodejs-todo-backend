const mongoose = require("mongoose");
// If new status needed adding new status will be enough (eg. started)
// new implimentation only added to frontend 
const StatusSchema = mongoose.Schema({
    status: {
        type: String
    }
});

const Status = mongoose.model("Status", StatusSchema);
module.exports = Status;