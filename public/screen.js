(async () => {
  if (window.location.hash && window.location.hash !== '') {
    const response = await window.fetch('/api', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      referrer: 'no-referrer',
      body: JSON.stringify({ username: window.location.hash.substring(1) }),
    });
    const { display, age, isBirthday, username } = await response.json();
    document.getElementById('root').innerHTML = `<p>${isBirthday ||
      ''} <b>${username}</b>${
      isBirthday ? ` ${isBirthday}` : ''
    }, your drupal.org birthday is <b>${display}</b>. Your account is <b>${age}</b> old.</p>`;
  }
})();
