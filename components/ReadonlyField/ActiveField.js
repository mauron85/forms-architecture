import { useFormState } from "react-final-form";
import { LabelValuePair } from "./LabelValuePair";

export const ActiveField = () => {
  const state = useFormState({ subscription: { active: true } });
  return <LabelValuePair label="Active Field" value={state.active} />;
};
