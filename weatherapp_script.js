// Never upload important keys -> this is an exeption to evade handling oAuth scipts on github.io to make an examination of an online server implementation possible
const apiKey = `3c5dbacc5e4db11ed8b00b8052e630a4`;// 

// Background images for different weather conditions
const weatherBackgrounds = {
    Clear: 'url("./background/sunny.jpg")',
    Clouds: 'url("./background/cloudy.jpg")',
    Rain: 'url("./background/rainy.jpg")',
    Drizzle: 'url("./background/foggy.jpg")',
    Thunderstorm: 'url("./background/thunderstorm.png")',
    Snow: 'url("./background/snowy.jpg")',
    Mist: 'url("./background/foggy2.jpg")'
};

// Set a random background image on load (Optimized for mobile)
const backgroundKeys = Object.keys(weatherBackgrounds);
const randomBackground = weatherBackgrounds[backgroundKeys[Math.floor(Math.random() * backgroundKeys.length)]];
document.body.style.backgroundImage = randomBackground;


let selectedLanguage = 'de';  // Default language is German

// Language-specific texts for different languages
const translations = {
    de: {
        title: "GEWITTER?!",
        cityLabel: "Stadt:",
        buttonLabel: "Da ist Gewitter?!",
        noStorm: "Kein Gewitter.",
        storm: "Gewitter!!!",
        inputPlaceholder: "Geben Sie eine Stadt ein.",
        languageLabel: "Sprache:",
        stationInfo: "Nächste Wetterstation: ",  
        tempInfo: "Temperatur: ",                
        weatherInfo: "Wetter: ",                 
        cityNotFound: "Stadt nicht gefunden. Bitte versuchen Sie es erneut.", 
        errorMessage: "Fehler beim Abrufen der Wetterdaten. Bitte versuchen Sie es erneut.",  
        forecastTitle: "5-Tage-Vorhersage"
    },

    en: {
        title: "THUNDERSTORM?!",
        cityLabel: "City:",
        buttonLabel: "Is there a storm?!",
        noStorm: "No storm.",
        storm: "Storm!!!",
        inputPlaceholder: "Enter a city.",
        languageLabel: "Language:",
        stationInfo: "Nearest weather station: ", 
        tempInfo: "Temperature: ",                
        weatherInfo: "Weather: ",                
        cityNotFound: "City not found. Please try again.",
        errorMessage: "Error fetching weather data. Please try again.",
        forecastTitle: "5-Day Forecast"
    },

    fr: {
        title: "ORAGE?!",
        cityLabel: "Ville:",
        buttonLabel: "Y a-t-il une tempête ?!",
        noStorm: "Pas de tempête.",
        storm: "Tempête!!!",
        inputPlaceholder: "Entrez une ville.",
        languageLabel: "Langue:",
        stationInfo: "Station météo la plus proche: ",
        tempInfo: "Température: ",                      
        weatherInfo: "Météo: ",                         
        cityNotFound: "Ville introuvable. Veuillez réessayer.",
        errorMessage: "Erreur lors de la récupération des données météorologiques. Veuillez réessayer.",
        forecastTitle: "Prévisions sur 5 jours"  
    },
    
    es: {
        title: "¿TORMENTA?!",
        cityLabel: "Ciudad:",
        buttonLabel: "¿Hay tormenta?",
        noStorm: "Sin tormenta.",
        storm: "¡Tormenta!",
        inputPlaceholder: "Ingrese una ciudad.",
        languageLabel: "Idioma:",
        stationInfo: "Estación meteorológica más cercana: ",  
        tempInfo: "Temperatura: ",                             
        weatherInfo: "Clima: ",                                
        cityNotFound: "Ciudad no encontrada. Inténtalo de nuevo.",
        errorMessage: "Error al obtener los datos meteorológicos. Por favor, inténtalo de nuevo.",
        forecastTitle: "Pronóstico de 5 días"
    }
};

// Updates the static text on the page based on the selected language
function updateTextContent() {
    const translation = translations[selectedLanguage];
    document.getElementById('mainName').innerText = translation.title;
    document.getElementById('cityLabel').innerText = translation.cityLabel;
    document.getElementById('weatherButton').innerText = translation.buttonLabel;
    document.getElementById('cityInput').placeholder = translation.inputPlaceholder;
    document.getElementById('languageLabel').innerText = translation.languageLabel;
}

// Event listener for language change
document.getElementById('languageSelect').addEventListener('change', function() {
    selectedLanguage = this.value;
    updateTextContent();
    getWeather();
});

// Event-Listener for Enter key
document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Function to fetch weather data
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert(translations[selectedLanguage].inputPlaceholder);
        return;
    }
    try {
        // Fetch geographic coordinates of the city
        const geo_response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`);
        const geo_data = await geo_response.json();

        // If no data is found for the city
        if (geo_data.length === 0) {
            alert(translations[selectedLanguage].cityNotFound);
            return;
        }

        const lat = geo_data[0].lat; // Get latitude
        const lon = geo_data[0].lon; // Get longitude

        // Fetch weather data for the coordinates with the selected language
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3c5dbacc5e4db11ed8b00b8052e630a4&units=metric&lang=${selectedLanguage}`);
        const data = await response.json();

        // Output nearest weather station and weather data
        document.getElementById('station').innerText = translations[selectedLanguage].stationInfo + `: ${data.name}, ${data.sys.country}`;
        document.getElementById('weatherData').innerText = translations[selectedLanguage].tempInfo + `: ${data.main.temp}°C, `+ translations[selectedLanguage].weatherInfo + `: ${data.weather[0].description}`;

        // Change background image based on the weather condition
        const mainWeather = data.weather[0].main;
        document.body.style.backgroundImage = weatherBackgrounds[mainWeather] || randomBackground;

        // Update text for thunderstorm indication
        if (mainWeather === 'Thunderstorm') {
            document.getElementById('mainName').innerText = translations[selectedLanguage].storm;
            document.getElementById('weatherButton').innerText = translations[selectedLanguage].storm;
        } else {
            document.getElementById('mainName').innerText = translations[selectedLanguage].noStorm;
            document.getElementById('weatherButton').innerText = translations[selectedLanguage].buttonLabel;
        }

        // Fetch 5-day forecast
        getForecast(lat, lon);

    } catch (error) {
        alert(translations[selectedLanguage].errorMessage);
        console.error(error);
    }
}

// Function to fetch 5-day forecast data
async function getForecast(lat, lon) {
    try {
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${selectedLanguage}`);
        const forecastData = await forecastResponse.json();

        const forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = '';  // Clear previous forecast

        // Make forecast box visible when data is available
        document.getElementById('forecastOutput').style.display = 'block';

        // Set the forecast title
        document.getElementById('forecastTitle').innerText = translations[selectedLanguage].forecastTitle || "5-Tage-Vorhersage";

        // Display forecast for every 8th item (24-hour intervals from 3-hour interval response)
        for (let i = 0; i < forecastData.list.length; i += 8) {
            const dayData = forecastData.list[i];

            // Create forecast item
            const forecastDay = document.createElement('div');
            forecastDay.classList.add('forecast-day');

            // Format the display of each day
            const date = new Date(dayData.dt * 1000).toLocaleDateString(selectedLanguage, { weekday: 'long', day: 'numeric', month: 'numeric' });
            const temp = `${dayData.main.temp}°C`;
            const description = dayData.weather[0].description;
            
            forecastDay.innerHTML = `
                <h3>${date}</h3>
                <p>${temp}</p>
                <p>${description}</p>
            `;
            forecastContainer.appendChild(forecastDay); // Append forecast item to the container
        }
    } catch (error) {
        console.error('Error fetching 5-day forecast:', error);
    }
}