// This file handles the functionality for the Media page, including displaying images and video.

document.addEventListener('DOMContentLoaded', function() {
    const mediaContainer = document.getElementById('media-container');

    // Function to load media content
    function loadMediaContent() {
        const mediaContent = [
            {
                type: 'image',
                src: 'images/placeholder.svg',
                alt: 'Inspirational Image'
            },
            {
                type: 'video',
                src: 'path/to/your/video.mp4',
                alt: 'Uplifting Video'
            }
        ];

        mediaContent.forEach(item => {
            let element;
            if (item.type === 'image') {
                element = document.createElement('img');
                element.src = item.src;
                element.alt = item.alt;
            } else if (item.type === 'video') {
                element = document.createElement('video');
                element.src = item.src;
                element.controls = true;
                element.alt = item.alt;
            }
            mediaContainer.appendChild(element);
        });
    }

    loadMediaContent();
});