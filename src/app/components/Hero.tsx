import SearchForm from './SearchForm'

type HeroProps = {
  query: string
}

function Hero({ query }: HeroProps) {
  return (
    <section className='pink-container'>
      <h5 className='tag'>Pitch, vote and grow</h5>
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
