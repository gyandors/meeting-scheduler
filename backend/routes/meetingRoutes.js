const e = require("express");

const meetingController = require("../controllers/meetingController");

const router = e.Router();

router.get("/", meetingController.getIndex);

router.get("/meeting/:meetId", meetingController.getScheduleMeeting);

router.post("/schedule-meeting", meetingController.postScheduleMeeting);

router.post("/cancel-meeting", meetingController.postCancelMeeting);

module.exports = router;
