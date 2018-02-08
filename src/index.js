const { send } = require('micro');
const { router, get } = require('microrouter');
const DrupalAPI = require('drupal-org-api');
const { format } = require('date-fns');
const template = require('./template');

const drupalapi = new DrupalAPI();

const api = (req, res) =>
  drupalapi
    .user({ name: req.params.username })
    .then(({ list }) =>
      send(
        res,
        200,
        template.render(
          format(new Date(list[0].created * 1000), 'MMMM Do @ HH:mm'),
          req.params.username,
        ),
      ),
    );

module.exports = router(get('/:username', api));
