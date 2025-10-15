import { Slide, SlideLayout, Heading, Image, Text } from "spectacle";
import * as TravelPortal from "./TravelPortal";
import * as IPAPortal from "./IPAPortal";

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
      <SlideLayout.TwoColumn left={<TravelPortal.Code />} right={<TravelPortal.Portal />} />
      <Slide>
        <Heading>IPA portal slightly different</Heading>
        <Text>Sorry, no diagram for IPA 🥺</Text>
      </Slide>
      <SlideLayout.TwoColumn left={<IPAPortal.Code />} right={<IPAPortal.Portal />} />
    </>
  );
}
