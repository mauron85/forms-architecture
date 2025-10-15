import { Slide, SlideLayout, Heading, Image } from "spectacle";
import { PortalApp } from "./PortalApp";
import { Code } from "./Code";

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
      <SlideLayout.TwoColumn left={<Code />} right={<PortalApp />} />
    </>
  );
}
