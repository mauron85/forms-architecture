import { Field as FinalField } from "react-final-form";
import { RenderCount } from "../RenderCount";
import styles from "./Field.module.css";

export const Input = ({ name, label, ...props }) => {
  return (
    <FinalField name={name} {...props}>
      {({ input, meta }) => (
        <div className={`mb-4 ${styles.field}`}>
          <RenderCount />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
          </label>
          <input
            {...input}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
        </div>
      )}
    </FinalField>
  );
};

export const Checkbox = ({ name, label, ...props }) => {
  return (
    <FinalField name={name} type="checkbox" {...props}>
      {({ input, meta }) => (
        <div className={`mb-4 ${styles.field}`}>
          <RenderCount />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
          </label>
          <input {...input} className="mr-2 leading-tight" />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
      )}
    </FinalField>
  );
};


export const TextArea = ({ name, label, ...props }) => {
  return (
    <FinalField name={name} type="textarea" {...props}>
      {({ input, meta }) => (
        <div className={`mb-4 ${styles.field}`}>
          <RenderCount />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
          </label>
          <input {...input} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
      )}
    </FinalField>
  );
};
