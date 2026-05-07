export type GalleryImage = {
  src: string
  alt: string
}

export const galleryImages: GalleryImage[] = Array.from({ length: 35 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0")

  return {
    src: `/images/gallery/photo-${number}.png`,
    alt: `Rika Nail Salon nail art gallery photo ${index + 1}`,
  }
})
