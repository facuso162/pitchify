import SearchForm from './SearchForm'

type HeroProps = {
  query: string
}

function Hero({ query }: HeroProps) {
  return (
    <section className='pink-container'>
      <div>
        <h4 className='tag'>Pitch, vote and grow</h4>
      </div>
      <h1 className='heading'>
        Pitch your startup,
        <br /> connect with entrepreneurs
      </h1>
      <p className='sub-heading'>
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
      </p>
      <SearchForm query={query} />
    </section>
  )
}

export default Hero
