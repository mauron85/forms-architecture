import { Slide, SlideLayout, Heading, Markdown, CodePane } from "spectacle";
import * as Form from "./Form";

export function FinalForm() {
  return (
    <>
      <Slide>
        <Heading>React Final Form 🏁</Heading>
        <Markdown>
          React Final Form is a **subscriptions-based** form state management
          library that uses the **Observer pattern**, so only the components
          that need updating are re-rendered as the form's state changes.
        </Markdown>
      </Slide>
      <SlideLayout.TwoColumn left={<Form.Code />} right={<Form.Form />} />
      <Slide>
        <Heading>How does it work? 🤷‍♀️</Heading>
        <CodePane language="javascript">
          {`
// https://github.com/final-form/react-final-form/blob/main/src/useField.ts
const form = useForm("useField");
const [state, setState] = React.useState();

React.useEffect(() => {
  const unsubscribe = form.registerField(
    name,
    newState => {
      setState((prevState) => {
        return newState;
      });
    },
    subscription
  );
  return unsubscribe;
}, []);
        `}
        </CodePane>
      </Slide>
    </>
  );
}
