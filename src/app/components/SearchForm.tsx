import Form from 'next/form'
import SearchFormResetBtn from './SearchFormResetBtn'
import { SearchIcon } from 'lucide-react'

type SearchFormProps = {
  query: string
}

function SearchForm({ query }: SearchFormProps) {
  return (
    <Form id='searchForm' action='/' className='search-form'>
      <input
        type='text'
        name='query'
        className='search-input'
        placeholder='Search Startups'
        defaultValue={query}
      />
      <div className='flex gap-2'>
        {query !== '' && <SearchFormResetBtn />}
        <button className='search-form-btn' type='submit'>
          <SearchIcon size={20} />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
