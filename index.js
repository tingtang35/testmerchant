const mongoose = require("mongoose");
const app = require("./src/app.js");
const DB = process.env.MONGO_DB_URI || 'mongodb://localhost/myapp'
mongoose.connect(DB);

app.listen(3000, function () {
    console.log("My web is running");
});

