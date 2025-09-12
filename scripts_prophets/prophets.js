const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets); // Uncomment to check data in console
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birth = document.createElement('p');
        let place = document.createElement('p');
        let portrait = document.createElement('img');

        // Fill content
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birth.textContent = `Date of Birth: ${prophet.birthdate}`;
        place.textContent = `Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append elements
        card.appendChild(fullName);
        card.appendChild(birth);
        card.appendChild(place);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
};

getProphetData();