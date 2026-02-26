// Esperamos a que el HTML cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('multimedia-input');
    const grid = document.getElementById('preview-grid');

    // Escuchamos cuando el usuario selecciona archivos
    input.addEventListener('change', function(event) {
        const files = event.target.files;

        // Procesamos cada archivo
        Array.from(files).forEach(file => {
            const reader = new FileReader();

            reader.onload = function(e) {
                const card = document.createElement('div');
                card.className = 'preview-card';

                // Si es imagen
                if (file.type.startsWith('image/')) {
                    card.innerHTML = `
                        <img src="${e.target.result}">
                        <p style="font-size:12px; margin-top:5px;">${file.name}</p>
                    `;
                } 
                // Si es video
                else if (file.type.startsWith('video/')) {
                    card.innerHTML = `
                        <video src="${e.target.result}" controls></video>
                        <p style="font-size:12px; margin-top:5px;">${file.name}</p>
                    `;
                }

                grid.appendChild(card);
            };

            // Leer el archivo para poder mostrarlo
            reader.readAsDataURL(file);
        });
    });
});
