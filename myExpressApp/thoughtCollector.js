

function journalSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = data.get('journalTitle');

  console.log('test:',{ value });
}
journalSubmit()
// const form = document.querySelector('form');
// form.addEventListener('submit', journalSubmit);