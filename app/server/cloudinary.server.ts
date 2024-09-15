import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadCloudinary(base64Url: string) {
  const result = await cloudinary.uploader.upload(base64Url, {
    access_mode: 'public',
    folder: 'big-alliance',
  })
  return result.url
}
