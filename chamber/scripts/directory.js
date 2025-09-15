<script>
        // Directory page JS: fetches members and toggles grid/list view

    document.addEventListener('DOMContentLoaded', () => {
        // Footer year and last modified
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    const directory = document.getElementById('directory');
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');

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
                        <p class="membership">Membership: ${['Member', 'Silver', 'Gold'][member.membership - 1]}</p>
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
                        Membership: ${['Member', 'Silver', 'Gold'][member.membership - 1]}
                    `;
            directory.appendChild(row);
        });
            }
        }

    getMembers();
    });
</script>