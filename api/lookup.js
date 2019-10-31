const fetch = require('node-fetch');
const moment = require('moment-timezone');
const momentDurationFormatSetup = require('moment-duration-format');

momentDurationFormatSetup(moment);

const createPayload = (username, created, now, timezone = 'UTC') => {
  const userTime = moment.unix(created).tz(timezone);
  const currentTime = moment(now).tz(timezone);
  return {
    display: userTime.format(`MMMM Do YYYY @ HH:mm zz`),
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

module.exports = async (req, res) => {
  const {
    body: { username, timezone },
  } = req;
  const {
    list: [user],
  } = await fetch(
    `https://www.drupal.org/api-d7/user.json?name=${username}`,
  ).then(response => response.json());
  const payload = createPayload(
    username,
    user.created,
    new Date().getTime(),
    timezone,
  );
  return res.status(200).send(payload);
};
