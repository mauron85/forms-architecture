import { useContext } from "react";
import {
  Form as FinalForm,
  Context as FinalFormContext,
} from "react-final-form";

function WizardForm(props) {
  const form = useContext(FinalFormContext);

  const validate = (values) => {
    if (props.validate) {
      return props.validate(values);
    }
    return {};
  };

  const handleSubmit = (values) => {
    if (props.onSubmit) {
      return props.onSubmit(values);
    }
    return {};
  };

  return (
    <FinalForm
      form={form}
      {...props}
      validate={validate}
      onSubmit={handleSubmit}
    />
  );
}

export { WizardForm };
