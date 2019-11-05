const form = document.getElementById('userNameQueryForm');
const fetchInformation = async uname => {
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
