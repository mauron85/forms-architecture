import { Deck, Slide, Heading, DefaultTemplate } from 'spectacle';

function Home() {
  return (
    <Deck template={<DefaultTemplate />}>
      <Slide>
        <Heading>Welcome to Spectacle</Heading>
      </Slide>
    </Deck>
  )
}

export default Home
