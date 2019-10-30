const indexData = `
<!doctype html>
<html lang="en">
  <head>
  <title>Drupal Birthday . Fun</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    html,
    body {
      height: 100%;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      text-rendering: geometricPrecision;
    }
    p {
      color: #424242;
    }
  </style>
  <meta name="title" content="Drupal Birthday . Fun" />
  <meta name="description" content="Find your Drupal Birthday, for Fun!" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Drupal Birthday . Fun" />
  <meta property="og:title" content="Drupal Birthday . Fun" />
  <meta property="og:description" content="Find your Drupal Birthday, for Fun!" />
  <meta property="og:url" content="https://drupalbirthday.fun/" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Drupal Birthday . Fun" />
  <meta name="twitter:description" content="Find your Drupal Birthday, for Fun!" />
  <meta name="twitter:url" content="https://drupalbirthday.fun/" />
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "url": "https://drupalbirthday.fun/",
      "name": "Drupal Birthday . Fun",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://drupalbirthday.fun/#{query}",
        "query-input": "required"
      }
    }
  </script>
  </head>
  <body>
    <div id="root">
      <p>https://drupalbirthday.fun/#{your drupal.org username}</p>
    </div>
    <script type="text/javascript" src="screen.js"></script>
  </body>
</html>
`;

module.exports = (req, res) => {
  return res.status(200).send(indexData);
};
