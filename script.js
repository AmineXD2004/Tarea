// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById('multimedia-input');
    const grid = document.getElementById('preview-grid');

    if (!input || !grid) {
        console.error("No se encontraron los elementos necesarios en el HTML.");
        return;
    }

    input.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {

            // Validación básica de tamaño (opcional)
            if (file.size > 20 * 1024 * 1024) {
                alert(`El archivo ${file.name} es demasiado grande.`);
                return;
            }

            const reader = new FileReader();

            reader.onload = (event) => {

                // Crear tarjeta
                const card = document.createElement('figure');
                card.classList.add('preview-card');

                // Crear media (img o video)
                let media;

                if (file.type.startsWith('image/')) {
                    media = document.createElement('img');
                    media.src = event.target.result;
                    media.alt = file.name;
                } 
                else if (file.type.startsWith('video/')) {
                    media = document.createElement('video');
                    media.src = event.target.result;
                    media.controls = true;
                } 
                else {
                    return;
                }

                // Crear caption
                const caption = document.createElement('figcaption');
                const text = document.createElement('p');
                text.textContent = `${file.type.startsWith('image/') ? '📸' : '🎥'} ${file.name}`;

                // Botón eliminar
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Eliminar';
                deleteBtn.classList.add('delete-btn');

                deleteBtn.addEventListener('click', () => {
                    card.remove();
                });

                caption.appendChild(text);
                caption.appendChild(deleteBtn);

                card.appendChild(media);
                card.appendChild(caption);

                grid.appendChild(card);

                // Animación de aparición
                card.style.opacity = "0";
                card.style.transform = "scale(0.9)";
                setTimeout(() => {
                    card.style.transition = "0.3s ease";
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 10);
            };

            reader.readAsDataURL(file);
        });

        // Limpia el input para permitir subir el mismo archivo otra vez
        input.value = "";
    });

});
