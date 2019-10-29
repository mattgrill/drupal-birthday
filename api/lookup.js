const fetch = require('node-fetch');
const moment = require('moment-timezone');
const momentDurationFormatSetup = require('moment-duration-format');

momentDurationFormatSetup(moment);

const createPayload = (username, created, now) => {
  const userTime = moment.unix(created).tz('UTC');
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

module.exports = async (req, res) => {
  const {
    body: { username },
  } = req;
  const {
    list: [user],
  } = await fetch(
    `https://www.drupal.org/api-d7/user.json?name=${username}`,
  ).then(response => response.json());
  const payload = createPayload(username, user.created, new Date().getTime());
  return res.status(200).send(payload);
};
