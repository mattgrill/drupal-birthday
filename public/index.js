const form = document.getElementById('userNameQueryForm');

const setError = error => {
  const errorsElement = document.getElementById('errors');
  errorsElement.innerHTML = `<p class="error-message">${error}</p>`;
};

const fetchInformation = async uname => {
  if (uname === '') {
    setError('Please enter a user name.');
    return;
  }
  document.getElementById('submit').classList.remove('hidden');

  const response = await window.fetch(
    `/api?username=${encodeURIComponent(uname)}`,
    {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      referrer: 'no-referrer',
    },
  );
  if (response.status > 400) {
    setError(
      'There was a problem getting your Drupal Birthday. Try a different user name.',
    );
    return;
  }
  const { display, age, isBirthday, username } = await response.json();

  window.history.pushState(null, null, `${uname}`);

  document.getElementById('root').innerHTML = `<p>✌️ ${isBirthday ||
    ''} <b>${username}</b>${
    isBirthday ? ` ${isBirthday}` : ''
  }, your Drupal.org account was created on <b><time datetime="${display}">${display}</time></b>. Your account is <b>${age}</b> old. ✌️</p>`;
};
// Handle original style urls.
if (window.location.pathname !== '/') {
  fetchInformation(window.location.pathname.split('/')[1]);
}
form.addEventListener('submit', e => {
  e.preventDefault();
  fetchInformation(document.getElementById('uname').value);
});
