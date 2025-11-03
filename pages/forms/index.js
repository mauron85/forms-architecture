import { FormSpy } from "react-final-form";
import { WizardForm } from "../../components/WizardForm";
import { RenderCount } from "../../components/RenderCount";
import { Input, Checkbox, TextArea } from "../../components/Field";
import { SidebarLayout } from "../../components/Layout";
import { useRouter } from "next/router";
import { noop } from "#utils/noop";

const required = (value) => (value ? undefined : "Required");

const validateStep1 = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  return errors;
};

function MultiStepForm() {
  const router = useRouter();

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // window.alert(JSON.stringify(values, 0, 2));
    router.push("/forms/page-2");
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Multi step form example</h1>
      <h2 className="text-2xl font-bold mb-4">Step 1</h2>

      <WizardForm
        validate={validateStep1}
        subscription={{
          values: false,
          submitting: true,
          pristine: true,
          valid: true,
        }}
        onSubmit={noop}
        initialValues={{
          // firstName: "John",
          lastName: "Connor",
          // employed: false,
        }}
      >
        {({ handleSubmit, form, __versions, ...formState }) => {
          const { submitting, pristine, valid } = formState;
          return (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4"
            >
              <RenderCount />

              <Input name="firstName" label="First Name" />
              <Input name="lastName" label="Last Name" />
              <Checkbox name="employed" label="Employed" initialValue={true} />
              <TextArea name="notes" label="Notes" />

              <div className="flex items-center justify-between">
                <button
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          );
        }}
      </WizardForm>

      <h2 className="text-2xl font-bold mb-4">Step 2</h2>

      <WizardForm
        // validate={validateStep1}
        onSubmit={onSubmit}
        // keepDirtyOnReinitialize
        subscription={{
          values: false,
          submitting: true,
          pristine: true,
          valid: true,
        }}
        initialValues={{
          // firstName: "John",
          // lastName: "Connor",
          // employed: true,
        }}
      >
        {({ handleSubmit, form, __versions, ...formState }) => {
          const { submitting, pristine, valid } = formState;
          return (
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4"
              >
                <RenderCount />

                <Input name="firstName" label="First Name" />
                              <Checkbox name="employed" label="Employed" initialValue={true} />

                <Input name="streetNr" label="Street Nr." />
                <Input name="city" label="City" />
                <Input
                  type="number"
                  name="postalCode"
                  label="Postal Code"
                  validate={required}
                />

                <Checkbox
                  name="consent1"
                  label="I agree to the terms and conditions"
                  initialValue={false}
                  // defaultValue={false}
                />
                <Checkbox
                  name="consent2"
                  label="I want to receive updates"
                  initialValue={true}
                  // defaultValue={false}
                />

                <div className="flex items-center justify-between">
                  <button
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={submitting || !valid}
                  >
                    Next
                  </button>
                </div>
              </form>
              {formState.values ? (
                <pre className="mt-6 text-gray-900">
                  {JSON.stringify(formState, 0, 2)}
                </pre>
              ) : (
                <FormSpy
                  subscription={{
                    submitting: true,
                    pristine: true,
                    valid: true,
                    values: true,
                    dirtyFields: true,
                    modified: true,
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
              )}
            </div>
          );
        }}
      </WizardForm>
    </>
  );
}

MultiStepForm.getLayout = function getLayout({ children: page }) {
  return <SidebarLayout sidebar={null}>{page}</SidebarLayout>;
};

export default MultiStepForm;
