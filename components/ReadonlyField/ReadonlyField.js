import useFormStore, { GLOBAL_FORM_ID } from "../../store";
import { LabelValuePair } from "./LabelValuePair";

export const ReadonlyField = ({ label, name }) => {
  const value = useFormStore((state) => state.forms[GLOBAL_FORM_ID]?.values?.[name])
  return <LabelValuePair label={label} value={value} />;
};
