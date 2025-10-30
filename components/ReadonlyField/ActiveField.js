import { useFormState } from "react-final-form";
import { LabelValuePair } from "./LabelValuePair";
import useFormStore from "../../store";

export const ActiveField = () => {
  const active = useFormStore(state => state.formState.active);
  // const state = useFormState({ subscription: { active: true } });
  return <LabelValuePair label="Active Field" value={active} />;
};
