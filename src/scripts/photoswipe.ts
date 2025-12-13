import PhotoSwipe from 'photoswipe'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

let lightbox: PhotoSwipeLightbox | null = null

export function initPhotoSwipe() {
  // Clean up existing lightbox
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }

  // Find all galleries on the page
  const galleries = document.querySelectorAll('[data-pswp-gallery]')

  if (galleries.length === 0) return

  // Initialize PhotoSwipe for each gallery
  galleries.forEach((gallery) => {
    const galleryId = gallery.getAttribute('data-pswp-gallery')

    const galleryLightbox = new PhotoSwipeLightbox({
      pswpModule: PhotoSwipe,
      children: 'a',
      gallery: `[data-pswp-gallery="${galleryId}"]`,

      // Enable smooth animations
      showHideAnimationType: 'fade',
      showAnimationDuration: 333,
      hideAnimationDuration: 333,
      bgClickAction: 'close',
      tapAction: 'close',
      arrowPrev: true,
      arrowNext: true,
      padding: {
        top: 46,
        bottom: 46,
        left: 16,
        right: 16,
      },
    })

    galleryLightbox.init()

    // Store reference to cleanup later
    if (!lightbox) {
      lightbox = galleryLightbox
    }
  })
}

export function destroyPhotoSwipe() {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }
}
