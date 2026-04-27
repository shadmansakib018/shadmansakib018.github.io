// Your Cloudinary cloud name — add to .env as VITE_CLOUDINARY_CLOUD_NAME
export const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''

// Add entries here as you upload photos to Cloudinary.
// Each entry: { id: 'cloudinary-public-id', caption: 'A caption 💕', date: '2024-01-01' }
export const gallery = [
  // { id: 'couple/photo1', caption: 'Our first adventure 🌸', date: '2024-03-10' },
]

export function getImageUrl(publicId, width = 600) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},h_${width},c_fill,q_auto,f_auto/${publicId}`
}
