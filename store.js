import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const GLOBAL_FORM_ID = Symbol("__global");

export const useFormStore = create(
  subscribeWithSelector((set) => ({
    forms: {
      [GLOBAL_FORM_ID]: { values: {}, state: {} },
    },

    setFormValues: (formId, updates) =>
      set((state) => ({
        forms: {
          ...state.forms,
          [formId]: {
            ...state.forms[formId],
            values: { ...state.forms[formId]?.values, ...updates },
          },
        },
      })),

    setFormState: (formId, stateUpdates) =>
      set((state) => ({
        forms: {
          ...state.forms,
          [formId]: {
            ...state.forms[formId],
            state: stateUpdates,
          },
        },
      })),
  }))
);

export default useFormStore;
