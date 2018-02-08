const css = require('./css');

const header = title => `
  <head>
    <title>${title}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      ${css()}
    </style>
  </head>
`;

const render = (date, username) => `
  <html>
    ${header(username)}
    <body>
      <p><b>${username}</b>, your drupal.org birthday is, <b>${date}</b></p>
    </body>
  </html>
`;

module.exports = { render };
