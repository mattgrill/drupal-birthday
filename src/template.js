const css = require('./css');

const header = title => `
  <title>${title}</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    ${css()}
  </style>
`;

const render = ({ display, age, isBirthday, username }) => `
  <html>
    <head>
      ${header(username)}
      <meta name="title" content="${title}'s Drupal Birthday" />
      <meta name="description" content="" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Drupal Birthday . Fun" />
      <meta property="og:title" content="${title}'s Drupal Birthday" />
      <meta property="og:description" content="" />
      <meta property="og:url" content="https://drupalbirthday.fun/${username}" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="${title}'s Drupal Birthday" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:url" content="https://drupalbirthday.fun/${username}" />
    </head>
    <body>
      <p>${isBirthday || ''} <b>${username}</b>${
  isBirthday ? ` ${isBirthday}` : ''
}, your drupal.org birthday is <b>${display}</b>. Your account is <b>${age}</b> old.</p>
    </body>
  </html>
`;

const homepage = () => `
  <html>
    <title>Drupal Birthday . Fun</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      ${css()}
    </style>
    <body>
      <p>https://drupalbirthday.fun/{your drupal.org username}</p>
    </body>
  </html>
`;

const error = username => `
  <html>
    <title>Drupal Birthday . Fun</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      ${css()}
    </style>
    <body>
      <p>Something went wrong when looking up, <b>${username}</b>. Maybe try again?</p>
    </body>
  </html>
`;

module.exports = { render, homepage, error };
