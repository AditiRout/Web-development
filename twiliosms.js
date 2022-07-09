'use strict';

const express = require('express');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const Appointment = require('../models/appointment');
const router = new express.Router();


const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// GET: /appointments
router.get('/', function(req, res, next) {
  Appointment.find()
    .then(function(appointments) {
      res.render('appointments/index', {appointments: appointments});
    });
});

// GET: /appointments/create
router.get('/create', function(req, res, next) {
  res.render('appointments/create', {
    timeZones: getTimeZones(),
    appointment: new Appointment({name: '',
                                  phoneNumber: '',
                                  notification: '',
                                  timeZone: '',
                                  time: ''})});
});

// POST: /appointments
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  const appointment = new Appointment({name: name,
                                       phoneNumber: phoneNumber,
                                       notification: notification,
                                       timeZone: timeZone,
                                       time: time});
  appointment.save()
    .then(function() {
      res.redirect('/');
    });
});

// GET: /appointments/:id/edit
router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  Appointment.findOne({_id: id})
    .then(function(appointment) {
      res.render('appointments/edit', {timeZones: getTimeZones(),
                                       appointment: appointment});
    });
});

// POST: /appointments/:id/edit
router.post('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  Appointment.findOne({_id: id})
    .then(function(appointment) {
      appointment.name = name;
      appointment.phoneNumber = phoneNumber;
      appointment.notification = notification;
      appointment.timeZone = timeZone;
      appointment.time = time;

      appointment.save()
        .then(function() {
          res.redirect('/');
        });
    });
});

// POST: /appointments/:id/delete
router.post('/:id/delete', function(req, res, next) {
  const id = req.params.id;

  Appointment.remove({_id: id})
    .then(function() {
      res.redirect('/');
    });
});

module.exports = router;

//Make an appointment: <input type="datetime-local" name="appointmentdate" min="2015-02-20 10:00" max="2015-04-24 10:00" step="3600">

'use strict';

const CronJob = require('cron').CronJob;
const notificationsWorker = require('./workers/notificationsWorker');
const moment = require('moment');

const schedulerFactory = function() {
  return {
    start: function() {
      new CronJob('00 * * * * *', function() {
        console.log('Running Send Notifications Worker for ' +
          moment().format());
        notificationsWorker.run();
      }, null, true, '');
    },
  };
};

module.exports = schedulerFactory();


'use strict';

const Appointment = require('../models/appointment');

const notificationWorkerFactory = function() {
  return {
    run: function() {
      Appointment.sendNotifications();
    },
  };
};

module.exports = notificationWorkerFactory();

AppointmentSchema.methods.requiresNotification = function(date) {
    return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
                            .diff(moment(date).utc())
                          ).asMinutes()) === this.notification;
  };
  
  AppointmentSchema.statics.sendNotifications = function(callback) {
    // now
    const searchDate = new Date();
    Appointment
      .find()
      .then(function(appointments) {
        appointments = appointments.filter(function(appointment) {
                return appointment.requiresNotification(searchDate);
        });
        if (appointments.length > 0) {
          sendNotifications(appointments);
        }
      });
    


    function sendNotifications(appointments) {
        const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
        appointments.forEach(function(appointment) {
            // Create options to send the message
            const options = {
                to: `+ ${appointment.phoneNumber}`,
                from: cfg.twilioPhoneNumber,
                /* eslint-disable max-len */
                body: `Hi ${appointment.name}. Just a reminder that you have an appointment coming up.`,
                /* eslint-enable max-len */
            };

            // Send the message!
            client.messages.create(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    let masked = appointment.phoneNumber.substr(0,
                        appointment.phoneNumber.length - 5);
                    masked += '*****';
                    console.log(`Message sent to ${masked}`);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call();
        }
    }
};
