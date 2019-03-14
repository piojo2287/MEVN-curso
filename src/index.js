const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost/consultorio-DB", { useNewUrlParser: true })

    .then(db => console.log("DB is conect"))
    .then(err => console.log(err));

//Setting
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/pacientes", require("./routes/pacientes"));

//Static files
app.use(express.static(__dirname + "/public"));

//Server is listening
app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"));
});
