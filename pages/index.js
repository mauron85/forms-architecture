import { Deck, DefaultTemplate } from 'spectacle';
import { Intro, WhatArePortals, FinalForm, PortalFormArchitecture, Proposal, Links } from '../components/slides';

function Home() {
  return (
    <Deck template={<DefaultTemplate />}>
        <Intro />
        <WhatArePortals />
        <FinalForm />
        <PortalFormArchitecture />
        <Proposal />
        <Links />
    </Deck>
  )
}

export default Home
