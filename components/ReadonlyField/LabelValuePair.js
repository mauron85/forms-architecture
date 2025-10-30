import { RenderCount } from "../RenderCount";
import s from "./LabelValuePair.module.css";

export const LabelValuePair = ({ label, value }) => {
  return (
    <div
      className={`${s.field} rounded-md shadow-sm border border-gray-300 px-4 py-2 mb-2 bg-white`}
    >
      <RenderCount />
      <span className="block text-gray-700 text-sm font-bold w-32">
        {label}
      </span>
      <span className="block text-gray-700 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
        {value}
      </span>
    </div>
  );
};
