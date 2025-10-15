import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { CodePane } from "spectacle";
import { Form as FinalForm, FormSpy } from "react-final-form";
import { createForm } from "final-form";
import { RenderCount } from "../../RenderCount";
import { Input, Checkbox, TextArea } from "../../Field";

const noop = () => {};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = (value) => (value ? undefined : "Required");

const formApi = createForm({ onSubmit: noop });
const GlobalContext = createContext(formApi);

const defaults = { values: true };

const useFormSpy = (subscription = defaults) => {
	const formApi = useContext(GlobalContext);
	const [formState, setFormState] = useState(formApi.getState());

	useMemo(() => {
		if (!formApi) return;

		const unsubscribe = formApi.subscribe(state => {
			setFormState(state);
		}, subscription);

		return unsubscribe;
	}, [formApi, subscription]);

	return formState;
};

export const Portal = () => {
  return (
    <GlobalContext.Provider value={formApi}>
      <Form />
    </GlobalContext.Provider>
  );
};

const Form = () => {
  const formApi = useContext(GlobalContext);
  // const { values } = useFormSpy();

  // useEffect(() => {
  //   formApi.setConfig('onSubmit', onSubmit);
  // }, [formApi]);

  return (
    <FinalForm
      form={formApi}
      onSubmit={onSubmit}
      subscription={{
        values: false,
        submitting: true,
        pristine: true,
        valid: true,
      }}
      initialValues={{
        firstName: "John",
        lastName: "Connor",
      }}
      render={({ handleSubmit, form, submitting, valid, pristine }) => {
        return (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <RenderCount />

            <Input name="firstName" label="First Name" validate={required} />
            <Input name="lastName" label="Last Name" validate={required} />
            <Checkbox name="employed" label="Employed" />
            <TextArea name="notes" label="Notes" />

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed"
                type="submit"
                disabled={submitting || pristine || !valid}
              >
                Submit
              </button>
              <button
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <FormSpy
              subscription={{
                submitting: true,
                pristine: true,
                valid: true,
                values: true,
              }}
            >
              {({ form, ...formState }) => {
                return (
                  <pre className="mt-6 text-gray-900">
                    {JSON.stringify(formState, 0, 2)}
                  </pre>
                );
              }}
            </FormSpy>
          </form>
        );
      }}
    />
  );
};

export const Code = () => (
  <CodePane language="javascript">
    {`
const formApi = createForm({ onSubmit: noop });
const GlobalContext = createContext(formApi);

const Form = () => {
  const formApi = useContext(GlobalContext);
  return (
    <FinalForm form={formApi}
      subscription={{ submitting: true, pristine: true, valid: true }}>
        {/* definition of fields ommited for brewity */}
        {/* no form synchronization needed */}
    </FinalForm>
  );
};

export const PortalApp = () => {
  return (
    <GlobalContext.Provider value={formApi}>
      <Form />
    </GlobalContext.Provider>
  );
};
`}
  </CodePane>
);
