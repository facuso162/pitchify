'use client'

import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

function SearchFormResetBtn() {
  const router = useRouter()
  const reset = () => {
    const form: HTMLFormElement | null = document.querySelector('#searchForm')

    if (form !== null) {
      form.reset()
      router.push('/')
    }
  }

  return (
    <button className='search-form-btn' type='reset' onClick={reset}>
      <XIcon size={20} />
    </button>
  )
}

export default SearchFormResetBtn
