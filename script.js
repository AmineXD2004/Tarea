document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('multimedia-input');
    const grid = document.getElementById('preview-grid');

    if (input) {
        input.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);

            files.forEach(file => {
                const reader = new FileReader();

                reader.onload = function(event) {
                    const card = document.createElement('div');
                    card.className = 'preview-card';

                    if (file.type.startsWith('image/')) {
                        card.innerHTML = `
                            <img src="${event.target.result}">
                            <figcaption><p>📸 ${file.name}</p></figcaption>
                        `;
                    } else if (file.type.startsWith('video/')) {
                        card.innerHTML = `
                            <video src="${event.target.result}" controls></video>
                            <figcaption><p>🎥 ${file.name}</p></figcaption>
                        `;
                    }
                    grid.appendChild(card);
                };
                reader.readAsDataURL(file);
            });
        });
    }
});
