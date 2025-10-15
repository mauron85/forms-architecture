import { Deck, DefaultTemplate } from 'spectacle';
import { Intro, WhatArePortals, FinalForm, PortalFormArchitecture, Proposal } from '../components/slides';

function Home() {
  return (
    <Deck template={<DefaultTemplate />}>
        <Intro />
        <WhatArePortals />
        <FinalForm />
        <PortalFormArchitecture />
        <Proposal />
    </Deck>
  )
}

export default Home
