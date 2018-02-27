const express = require('express');
const DrupalAPI = require('drupal-org-api');

const { to, createPayload, apiTimeExtras } = require('./lib');
const template = require('./template');

const app = express();
const drupalapi = new DrupalAPI();

const handler = async (req, res) => {
  const [err, data] = await to(drupalapi.user({ name: req.params.username }));

  if (err || !data || !data.list.length)
    return res.status(500).send(template.error(req.params.username));

  const { list: accounts } = data;
  const [user] = accounts;

  return res
    .status(200)
    .send(
      template.render(
        createPayload(req.params.username, user.created, new Date().getTime()),
      ),
    );
};

const apiHandler = async (req, res) => {
  const [err, data] = await to(drupalapi.user({ name: req.params.username }));

  if (err || !data || !data.list.length)
    return res.status(500).send(template.error(req.params.username));

  const { list: accounts } = data;
  const [user] = accounts;

  const currentTime = new Date().getTime();

  return res.send(
    Object.assign(
      { user },
      createPayload(req.params.username, user.created, currentTime),
      apiTimeExtras(user.created, currentTime),
    ),
  );
};

app.get('/api/:username', apiHandler);
app.get('/favicon.ico', (req, res) => res.status(404));
app.get('/:username', handler);
app.get('/', (req, res) => res.send(template.homepage()));

app.listen(3000, () => console.log('Listening on port 3000!'));
