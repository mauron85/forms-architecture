import { Slide, SlideLayout, Heading, Image } from "spectacle";
import * as PortalApp from "./PortalApp";

export function PortalFormArchitecture() {
  return (
    <>
      <Slide>
        <Heading>Current ITA portal</Heading>
        <Image
          src="portal_form_architecture.svg"
          alt="Portal Form Architecture Diagram"
          size="100%"
        />
      </Slide>
      <SlideLayout.TwoColumn left={<PortalApp.Code />} right={<PortalApp.PortalApp />} />
    </>
  );
}
