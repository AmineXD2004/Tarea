// Seleccionamos los elementos del DOM
const multimediaInput = document.getElementById('multimedia-input');
const previewGrid = document.getElementById('preview-grid');

multimediaInput.addEventListener('change', function() {
    // Recorremos cada archivo seleccionado
    const files = Array.from(this.files);

    files.forEach(file => {
        const reader = new FileReader();

        // Cuando el archivo termina de leerse
        reader.onload = function(e) {
            const container = document.createElement('div');
            container.className = 'preview-item';

            // Verificamos si es imagen o video
            if (file.type.startsWith('image/')) {
                container.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <figcaption><p>📸 ${file.name.substring(0, 15)}...</p></figcaption>
                `;
            } else if (file.type.startsWith('video/')) {
                container.innerHTML = `
                    <video src="${e.target.result}" controls></video>
                    <figcaption><p>🎥 ${file.name.substring(0, 15)}...</p></figcaption>
                `;
            }

            // Agregamos al diseño
            previewGrid.appendChild(container);
        };

        // Leer el archivo como URL de datos
        reader.readAsDataURL(file);
    });
});
