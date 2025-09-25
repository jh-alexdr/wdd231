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
        {
            subject: 'CSE',
            number: '110',
            title: 'Programming Building Blocks',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming concepts and help them develop skills to solve problems using a programming language.',
            technology: ['Python', 'Thinking Logically', 'Problem Solving'],
            type: 'CSE',
            code: 'CSE 110'
        },
        {
            subject: 'WDD',
            number: '130',
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
            technology: ['HTML', 'CSS', 'JavaScript', 'Web Design'],
            type: 'WDD',
            code: 'WDD 130'
        },
        {
            subject: 'CSE',
            number: '111',
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.',
            technology: ['Python', 'Functions', 'Testing', 'Debugging'],
            type: 'CSE',
            code: 'CSE 111'
        },
        {
            subject: 'CSE',
            number: '210',
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Students become more organized, efficient, and powerful computer programmers by learning to write and call methods of classes.',
            technology: ['C#', 'Object Oriented Programming', 'Classes', 'Encapsulation'],
            type: 'CSE',
            code: 'CSE 210'
        },
        {
            subject: 'WDD',
            number: '131',
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: ['HTML', 'CSS', 'JavaScript', 'DOM Manipulation', 'Forms'],
            type: 'WDD',
            code: 'WDD 131'
        },
        {
            subject: 'WDD',
            number: '231',
            title: 'Web Frontend Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Students will learn to build multipage websites and will be introduced to CSS Grid, Flexbox and responsive design principles.',
            technology: ['HTML', 'CSS', 'JavaScript', 'Grid', 'Flexbox', 'Responsive Design'],
            type: 'WDD',
            code: 'WDD 231'
        }
    ];

    const boxButton = document.querySelector('.boxButton');
    const boxCertificate = document.querySelector('.boxCertificate');
    const totalCredits = document.getElementById('totalCredits');
    const courseDetails = document.getElementById('courseDialog');
    const dialogContent = document.getElementById('dialogContent');
    const closeDialog = document.getElementById('closeDialog');

    // Function to display course details in modal
    function displayCourseDetails(course) {
        dialogContent.innerHTML = `
            <h2>${course.subject} ${course.number}</h2>
            <h3>${course.title}</h3>
            <p><strong>Credits</strong>: ${course.credits}</p>
            <p><strong>Certificate</strong>: ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
        `;
        courseDetails.showModal();
    }

    // Event listener for close button
    closeDialog.addEventListener('click', () => {
        courseDetails.close();
    });

    // Event listener to close modal when clicking outside
    courseDetails.addEventListener('click', (e) => {
        if (e.target === courseDetails) {
            courseDetails.close();
        }
    });

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

        // Add click event listener to each course card
        const courseCards = boxCertificate.querySelectorAll('.courseCard');
        courseCards.forEach(courseDiv => {
            courseDiv.addEventListener('click', () => {
                const code = courseDiv.getAttribute('data-code');
                const course = courses.find(c => c.code === code);
                if (course) {
                    displayCourseDetails(course);
                }
            });
        });

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

    // Inicial
    renderCourses('all');
});