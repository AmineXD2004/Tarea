const input = document.getElementById('multimedia-input');
const previewGrid = document.getElementById('preview-grid');

input.addEventListener('change', function() {
  const files = this.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function(e) {
      const div = document.createElement('div');
      div.className = 'preview-item';

      // Si es imagen
      if (file.type.startsWith('image/')) {
        div.innerHTML = `
          <img src="${e.target.result}" alt="Preview">
          <p>${file.name}</p>
        `;
      } 
      // Si es video
      else if (file.type.startsWith('video/')) {
        div.innerHTML = `
          <video src="${e.target.result}" controls></video>
          <p>${file.name}</p>
        `;
      }

      previewGrid.appendChild(div);
    }

    reader.readAsDataURL(file);
  }
});
