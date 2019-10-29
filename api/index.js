module.exports = (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
      <title>drupalbirthday.fun</title>
      </head>
      <body>
        <p>Soon.</p>
      </body>
    </html>
  `;
  res.status(200).send(html);
};
