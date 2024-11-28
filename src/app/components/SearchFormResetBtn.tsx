'use client'

import { XIcon } from 'lucide-react'

function SearchFormResetBtn() {
  const reset = () => {
    const form: HTMLFormElement | null = document.querySelector('#searchForm')

    if (form !== null) form.reset()
  }

  return (
    <button className='search-form-btn' type='reset' onClick={reset}>
      <XIcon size={20} />
    </button>
  )
}

export default SearchFormResetBtn
