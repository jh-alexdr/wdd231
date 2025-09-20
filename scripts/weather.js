// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// declare a const variable for the API URL
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=57c4a855ad0d9f4511dc01f8a0c0fd29';

// define an asynchronous function to fetch weather data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // output the results to console for testing
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// invoke the apiFetch function
apiFetch();