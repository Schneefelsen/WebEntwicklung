// Set a random background image on load (Refined URLs)
const weatherBackgrounds = {
    Clear: 'url("https://img.fotocommunity.com/sonniger-tag-an-der-hase-db6e4a8b-e4ac-4f11-8711-13923cc05ca7.jpg?height=1080")',
    Clouds: 'url("https://www.shutterstock.com/image-photo/cloudy-day-green-valley-600nw-627078857.jpg")',
    Rain: 'url("https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg")',
    Drizzle: 'url("https://upload.wikimedia.org/wikipedia/commons/5/5b/Row_of_poplars_in_the_drizzle_-_geograph.org.uk_-_591822.jpg")',
    Thunderstorm: 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3be8fb7d-5a6c-4f22-b44a-615bc9cb3909/dhvne37-d978447b-f91a-49bb-90cc-d33432dbf1c0.png/v1/fill/w_1920,h_1098,q_80,strp/epic_thunderstorm_wallpaper_4k_high_resolution_by_xaynagelast_dhvne37-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNiZThmYjdkLTVhNmMtNGYyMi1iNDRhLTYxNWJjOWNiMzkwOVwvZGh2bmUzNy1kOTc4NDQ3Yi1mOTFhLTQ5YmItOTBjYy1kMzM0MzJkYmYxYzAucG5nIiwiaGVpZ2h0IjoiPD0xMDk4Iiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvM2JlOGZiN2QtNWE2Yy00ZjIyLWI0NGEtNjE1YmM5Y2IzOTA5XC94YXluYWdlbGFzdC00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.FnX-pyNgNAIK_ge7FK33qStRJrqb5o0nM2HuOjapF4E")',
    Snow: 'url("https://thumbs.dreamstime.com/b/snowy-trees-city-park-sunny-day-white-background-132778541.jpg")',
    Mist: 'url("https://w.wallhaven.cc/full/p8/wallhaven-p858pj.jpg")'
};

// Set a random background image on load (Optimized for mobile)
const backgroundKeys = Object.keys(weatherBackgrounds);
const randomBackground = weatherBackgrounds[backgroundKeys[Math.floor(Math.random() * backgroundKeys.length)]];
document.body.style.backgroundImage = randomBackground;

document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Function to fetch and display weather data
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }
    try {
        // Fetch geodata
        const geo_response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=3c5dbacc5e4db11ed8b00b8052e630a4`);
        const geo_data = await geo_response.json();

        if (geo_data.length === 0) {
            alert('City not found. Please try again.');
            return;
        }

        const lat = geo_data[0].lat;
        const lon = geo_data[0].lon;

        // Fetch weather data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3c5dbacc5e4db11ed8b00b8052e630a4&units=metric`);
        const data = await response.json();

        // Display the nearest weather station and weather data
        document.getElementById('station').innerText = `Nearest Weather Station: ${data.name}, ${data.sys.country}`;
        document.getElementById('weatherData').innerText = `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;

        // Change background image based on weather condition
        const mainWeather = data.weather[0].main;
        document.body.style.backgroundImage = weatherBackgrounds[mainWeather] || randomBackground;
        // Change Name based on Thunderstorm
        if (mainWeather === 'Thunderstorm') {
            document.getElementById('mainName').innerText = 'Gewitter!!!'
            document.getElementById('weatherButton').innerText = 'Gewitter!!!'
        } else {
            document.getElementById('mainName').innerText = 'Kein Gewitter.'
            document.getElementById('weatherButton').innerText = 'Gewitter?!'
        }
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
        console.error(error);
    }
}
