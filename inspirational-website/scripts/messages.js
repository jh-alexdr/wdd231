// This file manages the content and functionality specific to the Messages page, 
// including loading reflections from the content.json file.

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/content.json')
        .then(response => response.json())
        .then(data => {
            displayMessages(data.messages);
        })
        .catch(error => console.error('Error loading messages:', error));
});

function displayMessages(messages) {
    const messagesContainer = document.getElementById('messages-container');
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <h3>${message.title}</h3>
            <p>${message.content}</p>
        `;
        messagesContainer.appendChild(messageElement);
    });
}