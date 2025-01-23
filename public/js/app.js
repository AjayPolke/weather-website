const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${input.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        })
        .catch(() => messageOne.textContent = 'Failed to fetch forecast')

})