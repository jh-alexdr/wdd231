// Directory page JS: fetches members and toggles grid/list view
// Also handles spotlight members for home page with OpenWeatherMap API

document.addEventListener('DOMContentLoaded', () => {
    // Footer year and last modified
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    const directory = document.getElementById('directory');
    const spotlightMembers = document.getElementById('spotlight-members');
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');

    // Membership level names for your data
    const membershipNames = {
        1: "Member",
        2: "Silver",
        3: "Gold"
    };

    async function getMembers() {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json();

            // Check if we're on the directory page or home page
            if (directory) {
                displayMembers(members, 'grid');
                // Toggle handlers for directory page
                if (gridBtn && listBtn) {
                    gridBtn.addEventListener('click', () => {
                        gridBtn.classList.add('active');
                        listBtn.classList.remove('active');
                        displayMembers(members, 'grid');
                    });
                    listBtn.addEventListener('click', () => {
                        listBtn.classList.add('active');
                        gridBtn.classList.remove('active');
                        displayMembers(members, 'list');
                    });
                }
            }

            // Check if we're on the home page and display spotlight members
            if (spotlightMembers) {
                displaySpotlightMembers(members);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    function displaySpotlightMembers(members) {
        // Filter to show only Gold (3) and Silver (2) members
        const featured = members.filter(member => member.membership === 2 || member.membership === 3);

        // Shuffle and take first 2-3 members (randomly choose between 2 or 3)
        const shuffled = featured.sort(() => 0.5 - Math.random());
        const numToShow = Math.floor(Math.random() * 2) + 2; // Randomly choose 2 or 3
        const selectedSpotlights = shuffled.slice(0, numToShow);

        spotlightMembers.innerHTML = '';

        selectedSpotlights.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <div class="contact-info">
                    <p><strong>📍</strong> ${member.address}</p>
                    <p><strong>📞</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank" class="website" rel="noopener">🌐 Visit Website</a>
                </div>
                <div class="membership">${membershipNames[member.membership]} Member</div>
            `;
            spotlightMembers.appendChild(card);
        });
    }

    function displayMembers(members, view) {
        directory.innerHTML = '';
        directory.className = view;
        if (view === 'grid') {
            members.forEach(member => {
                const card = document.createElement('div');
                card.className = 'member-card';
                card.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="80" height="80">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                    <p class="membership">Membership: ${membershipNames[member.membership] || "Member"}</p>
                `;
                directory.appendChild(card);
            });
        } else {
            members.forEach(member => {
                const row = document.createElement('div');
                row.className = 'member-row';
                row.innerHTML = `
                    <strong>${member.name}</strong> | 
                    ${member.address} | 
                    ${member.phone} | 
                    <a href="${member.website}" target="_blank">${member.website}</a> | 
                    Membership: ${membershipNames[member.membership] || "Member"}
                `;
                directory.appendChild(row);
            });
        }
    }

    getMembers();

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('nav ul');
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', navList.classList.contains('open'));
    });
});

// Weather section using OpenWeatherMap API for Quito, Ecuador
async function loadWeather() {
    // Quito, Ecuador coordinates
    const lat = -0.1807;
    const lon = -78.4678;
    const apiKey = '57c4a855ad0d9f4511dc01f8a0c0fd29';

    // Current weather URL
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    // 5-day forecast URL
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        // Fetch current weather
        const currentResponse = await fetch(currentWeatherUrl);
        const currentData = await currentResponse.json();

        // Fetch forecast
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Display current weather
        const temp = Math.round(currentData.main.temp);
        const description = currentData.weather[0].description;
        const iconCode = currentData.weather[0].icon;

        document.getElementById('weather-temp').textContent = `${temp}°C`;
        document.getElementById('weather-desc').textContent = description.charAt(0).toUpperCase() + description.slice(1);

        // Use OpenWeatherMap icons
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${iconCode}.png`;
        document.getElementById('weather-icon').alt = description;

        // Display 3-day forecast (today + next 2 days)
        const forecastList = forecastData.list;
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayAfter = new Date(today);
        dayAfter.setDate(today.getDate() + 2);

        // Get forecast for today (or current temp)
        document.getElementById('forecast-today').textContent = `${temp}°C`;

        // Get forecast for tomorrow (find forecast around noon)
        const tomorrowForecast = forecastList.find(item => {
            const forecastDate = new Date(item.dt * 1000);
            return forecastDate.getDate() === tomorrow.getDate() &&
                forecastDate.getHours() >= 12 &&
                forecastDate.getHours() <= 15;
        });

        if (tomorrowForecast) {
            document.getElementById('forecast-tomorrow').textContent = `${Math.round(tomorrowForecast.main.temp)}°C`;
        }

        // Get forecast for day after tomorrow
        const dayAfterForecast = forecastList.find(item => {
            const forecastDate = new Date(item.dt * 1000);
            return forecastDate.getDate() === dayAfter.getDate() &&
                forecastDate.getHours() >= 12 &&
                forecastDate.getHours() <= 15;
        });

        if (dayAfterForecast) {
            document.getElementById('forecast-next').textContent = `${Math.round(dayAfterForecast.main.temp)}°C`;
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Fallback to demo data if API fails
        document.getElementById('weather-temp').textContent = '22°C';
        document.getElementById('weather-desc').textContent = 'Partly Cloudy';
        document.getElementById('weather-icon').src = 'images/weather.svg';
        document.getElementById('forecast-today').textContent = '22°C';
        document.getElementById('forecast-tomorrow').textContent = '24°C';
        document.getElementById('forecast-next').textContent = '21°C';
    }
}

document.addEventListener('DOMContentLoaded', loadWeather);

function loadEvents() {
    const events = [
        {
            title: "Annual Tech Expo",
            date: "Oct 10, 2025",
            location: "Quito Convention Center",
            description: "Showcasing the latest in technology and innovation."
        },
        {
            title: "Networking Breakfast",
            date: "Nov 5, 2025",
            location: "Jhalex Commerce HQ",
            description: "Meet and connect with local business leaders."
        },
        {
            title: "Holiday Gala",
            date: "Dec 15, 2025",
            location: "Grand Hotel Quito",
            description: "Celebrate the year with food, music, and awards."
        }
    ];

    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = "";
    events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${event.title}</strong> <br>
            <small>${event.date} | ${event.location}</small><br>
            <span>${event.description}</span>`;
        eventsList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadEvents);
