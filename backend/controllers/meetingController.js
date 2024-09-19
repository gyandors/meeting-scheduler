const Meeting = require("../models/meetingModel");
const Schedule = require("../models/scheduleModel");

/**
 *
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @param {import('express').NextFunction} next - The Express next middleware function
 */
exports.getIndex = async (req, res, next) => {
  const meetings = await Meeting.findAll();
  const schedules = await Schedule.findAll();

  res.render("index", {
    meetings: meetings.map((m) => m.dataValues),
    schedules: schedules.map((s) => s.dataValues),
  });
};

/**
 *
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @param {import('express').NextFunction} next - The Express next middleware function
 */
exports.getScheduleMeeting = async (req, res, next) => {
  try {
    const meetings = await Meeting.findAll();
    const schedules = await Schedule.findAll();
    const meeting = await Meeting.findByPk(req.params.meetId);

    res.render("meeting", {
      meetings: meetings.map((m) => m.dataValues),
      schedules: schedules.map((s) => s.dataValues),
      meeting: meeting.dataValues,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

/**
 *
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @param {import('express').NextFunction} next - The Express next middleware function
 */
exports.postScheduleMeeting = async (req, res, next) => {
  const { name, email, link, time, meetId } = req.body;
  const meeting = await Meeting.findByPk(meetId);
  await meeting.createSchedule({ name, email, time, link });
  await meeting.decrement("slots");

  res.redirect("/");
};

/**
 *
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @param {import('express').NextFunction} next - The Express next middleware function
 */
exports.postCancelMeeting = async (req, res, next) => {
  const { meetId, schedId } = req.body;
  await (await Schedule.findByPk(schedId)).destroy();
  await (await Meeting.findByPk(meetId)).increment("slots");

  res.redirect("/");
};
