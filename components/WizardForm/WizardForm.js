import { useRef, useEffect } from "react";
import { Form as FinalForm, useForm } from "react-final-form";
import { createForm } from "final-form";
import useFormStore, { GLOBAL_FORM_ID } from "../../store";

function FormSync({ children, formId = GLOBAL_FORM_ID, ...props }) {
  const form = useForm("FormSync");
  const setFormState = useFormStore((state) => state.setFormState);
  const setFormValues = useFormStore((state) => state.setFormValues);
  const isSyncingRef = useRef(false);
  const lastValuesRef = useRef(form.getState().values);

  useEffect(() => {
    const unsubscribe = form.subscribe(
      (state) => {
        if (isSyncingRef.current) return;
        const { values, modified } = state;
        Object.entries(modified).forEach(([key, isModifield]) => {
          if (isModifield && !values.hasOwnProperty(key)) {
            values[key] = undefined;
          }
        });
        isSyncingRef.current = true;
        setFormValues(formId, values);
        isSyncingRef.current = false;
        lastValuesRef.current = values;
      },
      { values: true, modified: true }
    );
    return unsubscribe;
  }, [form, setFormValues]);

  useEffect(() => {
    const unsubscribe = form.subscribe(
      (state) => {
        setFormState(formId, state);
      },
      { active: true }
    );
    return unsubscribe;
  }, [form, setFormState]);

  useEffect(() => {
    const unsubscribe = useFormStore.subscribe(
      (state) => state.forms[formId]?.values,
      (nextValues) => {
        if (isSyncingRef.current || !nextValues) return;

        const prev = lastValuesRef.current;
        isSyncingRef.current = true;
        form.batch(() =>
          Object.keys(nextValues).forEach((k) => {
            if (nextValues[k] !== prev[k]) {
              form.change(k, nextValues[k]);
            }
          })
        );
        isSyncingRef.current = false;
        lastValuesRef.current = form.getState().values;
      }
    );

    return unsubscribe;
  }, [form, formId]);

  if (typeof children === "function") {
    return children(props);
  }

  return children;
}

function WizardForm({
  formId = GLOBAL_FORM_ID,
  initialValues,
  children,
  ...props
}) {
  const globalState = useFormStore.getState().forms[formId] ?? {};
  const values = {
    ...globalState.values,
    ...initialValues,
  };

  const form = useRef(createForm({ ...props, initialValues: values })).current;

  return (
    <FinalForm
      formId={formId}
      form={form}
      {...props}
      initialValues={values}
      component={FormSync}
    >
      {children}
    </FinalForm>
  );
}

export { WizardForm, GLOBAL_FORM_ID };
