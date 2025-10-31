import { useRef, useEffect } from "react";
import {
  Form as FinalForm,
  // useFormState,
} from "react-final-form";
import { createForm } from "final-form";
import useFormStore from "../../store";
import useFormState from "../../vendor/react-final-form/useFormState";

function FormStateObserver({ stepNr }) {
  const updateFormState = useFormStore((state) => state.updateFormState);
  const subscription = useRef({ active: true, modified: true, dirtyFields: true }).current;

  useFormState({
    subscription,
    onChange: (formState) => {
      updateFormState(stepNr, formState);
    },
  });

  return null;
}

function FormValuesObserver({ stepNr }) {
  const updateFormValues = useFormStore((state) => state.updateFormValues);
  const subscription = useRef({ values: true }).current;

  useFormState({
    subscription,
    onChange: (formState) => {
      updateFormValues(stepNr, formState.values);
    },
  });

  return null;
}

function FormSync({ children, stepNr, ...props }) {
  if (typeof children === "function") {
    return (
      <>
        {children(props)}
        <FormStateObserver stepNr={stepNr} />
        <FormValuesObserver stepNr={stepNr} />
      </>
    );
  }

  return children;
}

function WizardForm({ children, initialValues, ...props }) {
  const globalState = useFormStore.getState();
  const values = {
    ...globalState.formValues,
    ...initialValues,
  };

  const form = useRef(createForm({ ...props, initialValues: values })).current;

useEffect(() => {
  const unsubscribe = useFormStore.subscribe(
    ({ formState, formValues }) => {
      form.batch(() => {
        Object.keys(formState.modified).forEach(fieldName => {
          if (formState.modified[fieldName]) {
            if (formState.dirtyFields[fieldName]) {
              form.change(fieldName, formValues[fieldName]);
            } else {
              form.change(fieldName, form.getState().initialValues[fieldName]);
            }
          }
        });
      });
    }
  );

  return () => {
    console.log("Unsubscribing from form store.");
    unsubscribe();
  };
}, [form]);

  return (
    <FinalForm
      form={form}
      {...props}
      initialValues={values}
      component={FormSync}
    >
      {children}
    </FinalForm>
  );
}

export { WizardForm };
