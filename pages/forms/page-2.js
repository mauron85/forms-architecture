import Link from "next/link";
import { WizardForm } from "../../components/WizardForm";
import { RenderCount } from "../../components/RenderCount";
import { Input, Checkbox, TextArea } from "../../components/Field";
import { FormWizardLayout } from "../../components/Layout";
import { useRouter } from "next/router";

const required = (value) => (value ? undefined : "Required");

const onSubmit = async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  window.alert(JSON.stringify(values, 0, 2));
};

const validateStep = (values) => {
  const errors = {};
  if (!values.petName) {
    errors.petName = "Required";
  }
  if (!values.hobby) {
    errors.hobby = "Required";
  }
  return errors;
};

function MultiStepForm() {
  const router = useRouter();

  const onBack = () => {
    router.replace("/forms");
  }

  return (
    <>
      <h1>Multi step form example</h1>

      <WizardForm
        stepNr={3}
        validate={validateStep}
        onSubmit={onSubmit}
        subscription={{
          values: false,
          submitting: true,
          pristine: true,
          valid: true,
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

              <Input name="hobby" label="Hobby" />
              <Input name="petName" label="Pet Name" />
              <TextArea name="notes" label="Notes" />

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed"
                  type="button"
                  onClick={onBack}
                >
                  Back
                </button>
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
                  Submit
                </button>
              </div>
            </form>
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
