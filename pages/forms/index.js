import Link from "next/link";
import { FormSpy } from "react-final-form";
import { WizardForm } from "../../components/WizardForm";
import { RenderCount } from "../../components/RenderCount";
import { Input, Checkbox, TextArea } from "../../components/Field";
import { FormWizardLayout } from "../../components/Layout";
import { useRouter } from "next/router";

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
      <h1>Multi step form example</h1>

      <WizardForm
        stepNr={1}
        validate={validateStep1}
        subscription={{
          values: false,
          submitting: true,
          pristine: true,
          valid: true,
        }}
        initialValues={{
          firstName: "John",
          lastName: "Connor",
          employed: false,
        }}
      >
        {({ handleSubmit, form, __versions, ...formState }) => {
          const { submitting, pristine, valid } = formState;
          return (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <RenderCount />

              <Input name="firstName" label="First Name" />
              <Input name="lastName" label="Last Name" />
              <Checkbox name="employed" label="Employed" />
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

      <WizardForm
        stepNr={2}
        // validate={validateStep1}
        onSubmit={onSubmit}
        subscription={{
          values: false,
          submitting: true,
          pristine: true,
          valid: true,
        }}
        // initialValues={{
        //   firstName: "John",
        //   lastName: "Connor",
        //   employed: false,
        // }}
      >
        {({ handleSubmit, form, __versions, ...formState }) => {
          const { submitting, pristine, valid } = formState;
          return (
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <RenderCount />

                <Input name="streetNr" label="Street Nr." />
                <Input name="city" label="City" />
                <Input
                  type="number"
                  name="postalCode"
                  label="Postal Code"
                  validate={required}
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

const sidebarContent = (
  <ul>
    <li>
      <Link href="/forms">Form 1</Link>
    </li>
    <li>
      <Link href="/forms">Form 2</Link>
    </li>
    <li>
      <Link href="/forms">Form 3</Link>
    </li>
  </ul>
);

MultiStepForm.getLayout = function getLayout({ children: page }) {
  return <FormWizardLayout sidebar={null}>{page}</FormWizardLayout>;
};

export default MultiStepForm;
