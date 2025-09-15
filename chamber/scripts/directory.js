// Directory page JS: fetches members and toggles grid/list view

document.addEventListener('DOMContentLoaded', () => {
    // Footer year and last modified
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    const directory = document.getElementById('directory');
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');

    // Membership level names for your data
    const membershipNames = {
        1: "Member",
        2: "Silver",
        3: "Gold"
    };

    async function getMembers() {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members, 'grid');
        // Toggle handlers
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

// Weather section (simple example for Quito, Ecuador)
async function loadWeather() {
    // Quito, Ecuador coordinates
    const lat = -0.1807;
    const lon = -78.4678;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // Current weather
        document.getElementById('weather-temp').textContent = `${data.current_weather.temperature}°C`;
        document.getElementById('weather-desc').textContent = `Wind: ${data.current_weather.windspeed} km/h`;
        // Forecast
        document.getElementById('forecast-today').textContent = `${data.daily.temperature_2m_max[0]}°C`;
        document.getElementById('forecast-tomorrow').textContent = `${data.daily.temperature_2m_max[1]}°C`;
        document.getElementById('forecast-next').textContent = `${data.daily.temperature_2m_max[2]}°C`;
    } catch (e) {
        document.getElementById('weather-info').textContent = "Weather unavailable";
        document.getElementById('forecast-list').innerHTML = "<li>Unavailable</li>";
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
