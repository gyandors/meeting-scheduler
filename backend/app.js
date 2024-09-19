const express = require("express");
const bodyParser = require("body-parser");

const meetingRoutes = require("./routes/meetingRoutes");
const sequelize = require("./utils/sequelize");
const Meeting = require("./models/meetingModel");
const Schedule = require("./models/scheduleModel");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(meetingRoutes);

app.use((req, res, next) => {
  console.log("redirect");
  res.redirect("/");
});

Meeting.hasMany(Schedule);
Schedule.belongsTo(Meeting);

sequelize
  .sync()
  .then(() => {
    // Meeting.bulkCreate([
    //   {
    //     time: "12:30 PM",
    //     link: "https://meet.google.com/hjs-kjbc-imm",
    //     slots: 2,
    //   },
    //   {
    //     time: "02:00 PM",
    //     link: "https://meet.google.com/mfm-wzju-uuh",
    //     slots: 4,
    //   },
    //   {
    //     time: "03:30 PM",
    //     link: "https://meet.google.com/tjd-qmdt-yzx",
    //     slots: 1,
    //   },
    //   {
    //     time: "05:00 PM",
    //     link: "https://meet.google.com/hwr-nwfa-oap",
    //     slots: 5,
    //   },
    // ]);
    app.listen(port, () => console.log("Server listening on port", port));
  })
  .catch((err) => console.log(err));
