import { create } from "zustand";

const useFormStore = create((set) => ({
  formValues: {},
  formState: {},
  updateFormState: (stepNr, { values, ...formState }) =>
    set((state) => ({
      formValues: {
        ...state.formValues,
        ...values,
      },
      formState: {
        ...state.formState,
        ...formState,
      },
    })),
}));

export default useFormStore;
