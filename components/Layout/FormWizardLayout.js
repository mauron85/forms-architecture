import { createForm } from "final-form";
import { Context as FinalFormContext } from "react-final-form";
import { SidebarLayout } from "./SidebarLayout";

const noop = () => {};
const form = createForm({
  onSubmit: noop,
});

form.pauseValidation();

export const FormWizardLayout = ({ children, sidebar }) => {
  return (
    <FinalFormContext.Provider value={form}>
      <SidebarLayout sidebar={sidebar}>{children}</SidebarLayout>
    </FinalFormContext.Provider>
  );
};
