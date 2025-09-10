// This file manages the course information cards and any related functionality.

// Example function to create a course card
function createCourseCard(courseTitle, courseDescription) {
    const card = document.createElement('div');
    card.classList.add('course-card');

    const title = document.createElement('h3');
    title.textContent = courseTitle;

    const description = document.createElement('p');
    description.textContent = courseDescription;

    card.appendChild(title);
    card.appendChild(description);

    return card;
}

// Example function to display course cards
function displayCourses() {
    const courses = [
        { title: 'HTML Basics', description: 'Learn the fundamentals of HTML.' },
        { title: 'CSS Fundamentals', description: 'Understand the basics of CSS for styling.' },
        { title: 'JavaScript Essentials', description: 'Get started with JavaScript programming.' }
    ];

    const courseContainer = document.getElementById('course-container');
    courses.forEach(course => {
        const courseCard = createCourseCard(course.title, course.description);
        courseContainer.appendChild(courseCard);
    });
}

// Call the displayCourses function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        { code: 'CSE 110', type: 'CSE', credits: 2, title: 'Programming Building Blocks', desc: 'Intro to programming.' },
        { code: 'WDD 130', type: 'WDD', credits: 2, title: 'Web Fundamentals', desc: 'Intro to web development.' },
        { code: 'CSE 111', type: 'CSE', credits: 2, title: 'Programming with Functions', desc: 'Intermediate programming.' },
        { code: 'CSE 210', type: 'CSE', credits: 2, title: 'Programming with Classes', desc: 'OOP with classes.' },
        { code: 'WDD 131', type: 'WDD', credits: 2, title: 'Dynamic Web Fundamentals', desc: 'Dynamic web content.' },
        { code: 'WDD 231', type: 'WDD', credits: 2, title: 'Web Frontend Development I', desc: 'Frontend web dev.' }
    ];

    const boxButton = document.querySelector('.boxButton');
    const boxCertificate = document.querySelector('.boxCertificate');
    const totalCredits = document.getElementById('totalCredits');
    const dialog = document.getElementById('courseDialog');
    const dialogContent = document.getElementById('dialogContent');
    const closeDialog = document.getElementById('closeDialog');

    // Botones de filtro
    boxButton.innerHTML = `
        <button class="courseButton active" data-filter="all">All</button>
        <button class="courseButton" data-filter="CSE">CSE</button>
        <button class="courseButton" data-filter="WDD">WDD</button>
    `;

    function renderCourses(filter) {
        let filtered = courses;
        if (filter && filter !== 'all') {
            filtered = courses.filter(c => c.type === filter);
        }
        boxCertificate.innerHTML = filtered.map(c =>
            `<div class="courseCard" tabindex="0" data-code="${c.code}">
                <h3>${c.code}</h3>
            </div>`
        ).join('');
        // Créditos
        const credits = filtered.reduce((sum, c) => sum + c.credits, 0);
        totalCredits.textContent = `The total credits for course listed above is ${credits}`;
    }

    // Filtro
    boxButton.addEventListener('click', e => {
        if (e.target.classList.contains('courseButton')) {
            document.querySelectorAll('.courseButton').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderCourses(e.target.dataset.filter);
        }
    });

    // Mostrar dialog al hacer click en un curso
    boxCertificate.addEventListener('click', e => {
        const card = e.target.closest('.courseCard');
        if (card) {
            const code = card.getAttribute('data-code');
            const course = courses.find(c => c.code === code);
            if (course) {
                dialogContent.innerHTML = `
                    <h3>${course.code} - ${course.title}</h3>
                    <p><strong>Credits:</strong> ${course.credits}</p>
                    <p>${course.desc}</p>
                `;
                dialog.showModal();
            }
        }
    });

    // Cerrar dialog
    closeDialog.addEventListener('click', () => {
        dialog.close();
    });

    // Inicial
    renderCourses('all');
});