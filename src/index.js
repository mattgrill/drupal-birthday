const express = require('express');
const DrupalAPI = require('drupal-org-api');
const { format, compareAsc } = require('date-fns');
const template = require('./template');

const app = express();
const drupalapi = new DrupalAPI();

const handler = async (req, res) => {
  const accountCreationDate = await drupalapi
    .user({ name: req.params.username })
    .then(({ list }) => ({
      formattedDate: format(
        new Date(list[0].created * 1000),
        'MMMM Do @ HH:mm',
      ),
      compareableDate: format(new Date(list[0].created * 1000), 'MM/DD'),
    }))
    .catch(console.error);
  const isBirthday =
    compareAsc(
      format(new Date(), 'MM/DD'),
      accountCreationDate.compareableDate,
    ) === 1
      ? ' 🎂 '
      : '';
  return res.send(
    template.render(
      accountCreationDate.formattedDate,
      req.params.username,
      isBirthday,
    ),
  );
};

app.get('/favicon.ico', (req, res) => res.status(404));
app.get('/:username', handler);

app.listen(3000, () => console.log('Listening on port 3000!'));
