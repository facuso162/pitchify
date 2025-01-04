'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type ImageUploadProps = {
  onChange: (newImage: File) => void
  image: File | null
}

function ImageUpload({ onChange, image }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (imagePreviewURL) {
        window.URL.revokeObjectURL(imagePreviewURL)
      }
    }
  }, [imagePreviewURL])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0]

    if (!newImage) return

    onChange(newImage)
    setImagePreviewURL(window.URL.createObjectURL(newImage))
  }

  const handleClickRedirect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='flex flex-col gap-2'>
      <label className='font-bold uppercase tracking-wide'>Image</label>
      <div className='flex flex-col-reverse gap-2 md:flex-row'>
        <div className='flex flex-col gap-1'>
          <button
            onClick={handleClickRedirect}
            className='w-full border-2 border-black rounded-3xl px-2 py-2 text-sm font-medium hover:bg-black hover:text-white cursor-pointer'>
            {image ? image.name : 'Choose an image'}
          </button>
          <p className='text-xs text-black-300 font-medium'>
            Click above or on the preview to change image
          </p>
          <input
            type='file'
            accept='image/jpeg, image/png, image/webp'
            name='image'
            id='image'
            onChange={handleImageChange}
            className='hidden'
            ref={fileInputRef}
          />
        </div>
        <div
          onClick={handleClickRedirect}
          className='relative w-full aspect-[16/9] border-2 border-black rounded-3xl overflow-hidden cursor-pointer'>
          <Image
            src={imagePreviewURL || '/default-startup-image.png'}
            alt='Startup image preview'
            fill
            className='object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
