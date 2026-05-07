export type GalleryImage = {
  src: string
  alt: string
}

export const galleryImagePaths: string[] = Array.from({ length: 35 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0")

  return `/images/gallery/photo-${number}.png`
})

export const galleryImages: GalleryImage[] = galleryImagePaths.map((src, index) => {
  return {
    src,
    alt: `Rika Nail Salon nail art gallery photo ${index + 1}`,
  }
})
