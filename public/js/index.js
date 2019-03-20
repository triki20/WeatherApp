console.log('js to html');

const weatherForm = document.querySelector('form');
const search = document.querySelector('#location');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const si = document.querySelector('#si');
const us = document.querySelector('#us');
const weatherIcon = document.querySelector('#weatherIcon');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var temperature = '';
    if(si.checked == true){
        temperature = 'si';
    }else{
        temperature = 'us';
    };

    const location = search.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';
    weatherIcon.setAttribute("src", 'img/loading.gif');

    fetch(`/weather?address=${location}&units=${temperature}`).then((res) => {
    res.json().then((date) => {
        if(date.error){
            messageOne.textContent = date.error; 
        }else{
            messageOne.textContent = date.location;
            messageTwo.textContent = date.forecast;

            
            weatherIcon.setAttribute("src", `/img/weatherIcon/${date.icon}.jpg`);
            weatherIcon.setAttribute("alt", "Weather Icon");
            
        }
        });
    });
});