import { createContext, useContext } from "react";
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
const subscription = { submitting: true, pristine: true };

const formApi = createForm({ onSubmit: noop });
const GlobalContext = createContext(formApi);

export const PortalApp = () => {
  return (
    <GlobalContext.Provider value={formApi}>
      <Form />
    </GlobalContext.Provider>
  );
};

const Form = () => {
  const formApi = useContext(GlobalContext);

  return (
    <FinalForm
      form={formApi}
      onSubmit={onSubmit}
      subscription={subscription}
      initialValues={{ stooge: "larry", employed: false }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={submitting || pristine}
            >
              Submit
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <FormSpy subscription={{ values: true }}>
            {({ values }) => {
              formApi.initialize(values);

              return (
                <pre className="mt-6 text-gray-900">
                  {JSON.stringify(values, 0, 2)}
                </pre>
              );
            }}
          </FormSpy>
        </form>
      )}
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
    <FinalForm>
        {/* definition of fields ommited for brewity */}
        <FormSpy subscription={{ values: true }}>
            {({ values }) => {
                formApi.initialize(values);
            }}
        </FormSpy>
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
