'use client'

function SearchFormResetBtn() {
  const reset = () => {
    const form: HTMLFormElement | null = document.querySelector('#searchForm')

    if (form !== null) form.reset()
  }

  return (
    <button className='search-form-btn' type='reset' onClick={reset}>
      X
    </button>
  )
}

export default SearchFormResetBtn
