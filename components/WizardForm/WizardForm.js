import { useContext, useEffect } from "react";
import {
  Form as FinalForm,
  Context as FinalFormContext,
  FormSpy,
  useForm,
} from "react-final-form";
import useFormStore from "../../store";

function FormInitializer({ initialValues}) {
  const form = useForm();
  const formValues = useFormStore((state) => state.formValues);

  useEffect(() => {
    // Initialize form values when the form loads
    form.initialize({ ...initialValues, ...formValues });
  }, []);

  return null;
}

function FormSync({ children, stepNr, ...props }) {
  // const form = useContext(FinalFormContext);
  const updateFormState = useFormStore((state) => state.updateFormState);

  if (typeof children === "function") {
    return (
      <>
        {children(props)}
        <FormInitializer initialValues={props.initialValues} />
        <FormSpy
          onChange={(formState) => {
            const modifiedValues = Object.keys(formState.modified).reduce(
              (acc, key) => {
                acc[key] = formState.values[key];
                return acc;
              },
              {}
            );
            updateFormState(stepNr, {
              values: modifiedValues,
              active: formState.active,
            });
          }}
        ></FormSpy>
      </>
    );
  }

  return children;
}

function WizardForm({ children, ...props }) {
  // const form = useContext(FinalFormContext);

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
      // form={form}
      // keepDirtyOnReinitialize
      {...props}
      validate={validate}
      onSubmit={handleSubmit}
      component={FormSync}
      // initialValues={formValues}
    >
      {children}
    </FinalForm>
  );
}

export { WizardForm };
