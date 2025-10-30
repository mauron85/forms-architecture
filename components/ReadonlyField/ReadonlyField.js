import { useField } from "react-final-form";
import useFormStore from "../../store";

import { LabelValuePair } from "./LabelValuePair";

export const ReadonlyField = ({ label, name }) => {
  // const value = useField(name)?.input?.value;
  // const { formValues } = useFormStore();
  const value = useFormStore((state) => state.formValues[name])

  return <LabelValuePair label={label} value={value} />;
};
