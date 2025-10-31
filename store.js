import { create } from "zustand";

const useFormStore = create((set) => ({
  formValues: {
    firstName: "Albert",
    // lastName: "Einstein"
  },
  formState: {},
  updateFormValues: (stepNr, values) =>
    set((state) => ({
      formValues: {
        ...state.formValues,
        ...values,
      },
    })),
  updateFormState: (stepNr, formState) =>
    set((state) => ({
      formState: {
        ...state.formState,
        ...formState,
      },
    })),
}));

export default useFormStore;
