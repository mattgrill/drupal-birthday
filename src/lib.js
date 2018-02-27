const moment = require('moment-timezone');
require('moment-duration-format');

const to = promise => promise.then(data => [null, data]).catch(err => [err]);

const createPayload = (username, userCreatedTimeStamp, now) => {
  const userTime = moment.unix(userCreatedTimeStamp).tz('UTC');
  const currentTime = moment(now).tz('UTC');

  return {
    display: userTime.format(`MMMM Do ${new Date().getFullYear()} @ HH:mm`),
    age: moment
      .duration(currentTime.diff(userTime, 'seconds'), 'seconds')
      .format({
        template: 'y [years] M [months] d [days]',
        trim: 'all',
        largest: 3,
      }),
    isBirthday: (userTime.isSame(currentTime) && '🎂') || false,
    username,
  };
};

const apiTimeExtras = (userCreatedTimeStamp, now) => ({
  userTime: moment
    .unix(userCreatedTimeStamp)
    .tz('UTC')
    .format('MMMM Do YYYY HH:mm'),
  currentTime: moment(now)
    .tz('UTC')
    .format('MMMM Do YYYY HH:mm'),
});

module.exports = { to, createPayload, apiTimeExtras };
