import * as React from "react";
import { formSubscriptionItems } from "final-form";
import { useForm } from "react-final-form";
import shallowEqual from "./shallowEqual";

export const all = formSubscriptionItems.reduce((result, key) => {
  result[key] = true;
  return result;
}, {});

function useFormState({ onChange, subscription = all } = {}) {
  const form = useForm("useFormState");
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(() => {
    let prevState = form.getState();
    // Subscribe to form state changes after initial render
    const unsubscribe = form.subscribe((newState) => {
      if (!shallowEqual(prevState, newState)) {
        prevState = newState;
        if (onChangeRef.current) {
          onChangeRef.current(newState);
        }
      }
    }, subscription);

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, subscription]);

  return null;
}

export default useFormState;
