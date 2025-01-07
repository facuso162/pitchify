'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type ImageUploadProps = {
  type: 'startup' | 'author'
  initialImageURL?: string
}

function ImageUpload({ initialImageURL, type }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(
    initialImageURL ? initialImageURL : null
  )

  useEffect(() => {
    return () => {
      if (imagePreviewURL) {
        window.URL.revokeObjectURL(imagePreviewURL)
      }
    }
  }, [imagePreviewURL])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0]

    if (newImage === undefined) return

    setImagePreviewURL(window.URL.createObjectURL(newImage))
  }

  const handleClickRedirect = () => {
    fileInputRef.current?.click()
  }

  const defaultImage =
    type === 'startup' ? '/default-startup-image.png' : '/default-author-image.jpg'

  return (
    <div className='flex flex-col gap-2'>
      <label className='font-bold uppercase tracking-wide text-black'>Image</label>
      <div className='flex flex-col-reverse gap-2 md:flex-row'>
        <div className='flex flex-col gap-1'>
          <button
            onClick={handleClickRedirect}
            type='button'
            className='w-full border-2 border-black text-black rounded-3xl px-2 py-2 text-sm font-medium hover:bg-black hover:text-white cursor-pointer'>
            Choose an image
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
          className={`${type === 'startup' ? 'aspect-[16/9] rounded-3xl w-full' : 'rounded-full aspect-square w-1/5'} relative  border-2 border-black overflow-hidden cursor-pointer`}>
          <Image
            src={imagePreviewURL || defaultImage}
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
