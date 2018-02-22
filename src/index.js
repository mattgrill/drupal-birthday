const express = require('express');
const DrupalAPI = require('drupal-org-api');
const { format, compareAsc, differenceInMonths } = require('date-fns');
const template = require('./template');

const app = express();
const drupalapi = new DrupalAPI();

const handler = async (req, res) => {
  let responseData = {};
  const { list: accounts } = await drupalapi
    .user({ name: req.params.username })
    .catch(() => false);
  if (accounts && accounts.length) {
    const status = 200;
    const accountCreationDetails = {
      formattedDate: format(
        new Date(accounts[0].created * 1000),
        `MMMM Do ${new Date().getFullYear()} @ HH:mm`,
      ),
      age: {
        year: Math.floor(
          differenceInMonths(new Date(), new Date(accounts[0].created * 1000)) /
            12,
        ),
        month:
          differenceInMonths(new Date(), new Date(accounts[0].created * 1000)) %
          12,
      },
      compareableDate: format(new Date(accounts[0].created * 1000), 'MM/DD'),
    };
    const isBirthday =
      compareAsc(
        format(new Date(), 'MM/DD'),
        accountCreationDetails.compareableDate,
      ) === 0
        ? '🎂'
        : false;
    const payload = template.render(
      accountCreationDetails.formattedDate,
      accountCreationDetails.age,
      req.params.username,
      isBirthday,
    );
    responseData = { status, payload };
  } else {
    const status = 404;
    const payload = template.error(req.params.username);
    responseData = { status, payload };
  }

  return res.status(responseData.status).send(responseData.payload);
};

const apiHandler = async (req, res) => {
  const data = await drupalapi.user({ name: req.params.username });
  return res.send(data);
};

app.get('/api/:username', apiHandler);
app.get('/favicon.ico', (req, res) => res.status(404));
app.get('/:username', handler);
app.get('/', (req, res) => res.send(template.homepage()));

app.listen(3000, () => console.log('Listening on port 3000!'));
