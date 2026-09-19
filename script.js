document.addEventListener('DOMContentLoaded', () => {
  const localImages = [
    'assets/photo_2026-09-15_12.32.54.jpeg',
    'assets/photo_2026-09-15_12.33.02.jpeg',
    'assets/photo_2026-09-15_12.33.04.jpeg',
    'assets/photo_2026-09-15_12.33.07.jpeg',
    'assets/photo_2026-09-15_12.33.08.jpeg',
    'assets/photo_2026-09-15_12.33.10.jpeg',
    'assets/photo_2026-09-15_12.33.13.jpeg',
    'assets/photo_2026-09-15_12.33.15.jpeg',
    'assets/photo_2026-09-15_12.33.16.jpeg',
    'assets/photo_2026-09-15_12.33.17.jpeg',
    'assets/photo_2026-09-15_12.33.18.jpeg',
    'assets/photo_2026-09-15_12.33.19.jpeg',
    'assets/photo_2026-09-15_12.33.20.jpeg',
    'assets/photo_2026-09-15_12.33.22.jpeg',
    'assets/photo_2026-09-15_12.33.23.jpeg',
    'assets/photo_2026-09-15_12.33.24.jpeg',
    'assets/photo_2026-09-15_12.33.25.jpeg',
    'assets/photo_2026-09-15_12.33.26.jpeg',
    'assets/photo_2026-09-15_12.33.28.jpeg',
    'assets/photo_2026-09-15_12.33.29.jpeg'
  ];

  const galleryModal = document.getElementById('galleryModal');
  const galleryList = document.getElementById('galleryList');
  const closeBtn = document.querySelector('.modal-close');
  const photoViewer = document.getElementById('photoViewer');
  const expandedPhoto = document.getElementById('expandedPhoto');
  const photoViewerClose = document.querySelector('.photo-viewer-close');

  function openGallery() {
    galleryList.innerHTML = localImages.map((image, index) => `
      <figure class="gallery-list-item">
        <img src="${image}" alt="Фото дома ${index + 1}" loading="lazy" data-photo-index="${index}" />
      </figure>
    `).join('');
    galleryModal.classList.add('open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-is-open');
  }

  function closeGallery() {
    galleryModal.classList.remove('open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-is-open');
  }

  document.querySelectorAll('.gallery-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openGallery();
    });
  });

  function openPhotoViewer(image) {
    expandedPhoto.src = image;
    photoViewer.classList.add('open');
    photoViewer.setAttribute('aria-hidden', 'false');
  }

  function closePhotoViewer() {
    photoViewer.classList.remove('open');
    photoViewer.setAttribute('aria-hidden', 'true');
    expandedPhoto.src = '';
  }

  closeBtn?.addEventListener('click', closeGallery);

  galleryList?.addEventListener('click', (event) => {
    const item = event.target.closest('.gallery-list-item');
    const image = item?.querySelector('img[data-photo-index]');
    if (image) openPhotoViewer(image.src);
  });

  photoViewerClose?.addEventListener('click', closePhotoViewer);
  photoViewer?.addEventListener('click', (event) => {
    if (event.target === photoViewer) closePhotoViewer();
  });

  galleryModal?.addEventListener('click', (event) => {
    if (event.target === galleryModal) closeGallery();
  });

  document.addEventListener('keydown', (event) => {
    if (photoViewer?.classList.contains('open') && event.key === 'Escape') {
      closePhotoViewer();
      return;
    }
    if (galleryModal?.classList.contains('open') && event.key === 'Escape') closeGallery();
  });

});
