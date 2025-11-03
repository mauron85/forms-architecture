import { LabelValuePair } from "./LabelValuePair";
import useFormStore, { GLOBAL_FORM_ID } from "../../store";

export const ActiveField = () => {
  const active = useFormStore(state => state.forms[GLOBAL_FORM_ID]?.state?.active);
  return <LabelValuePair label="Active Field" value={active} />;
};
