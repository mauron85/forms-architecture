import { useField } from "react-final-form";
import { LabelValuePair } from "./LabelValuePair";

export const ReadonlyField = ({ label, name }) => {
  const value = useField(name)?.input?.value;
  return <LabelValuePair label={label} value={value} />;
};
