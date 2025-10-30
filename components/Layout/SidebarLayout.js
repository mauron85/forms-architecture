import { ReadonlyField, ActiveField } from "../ReadonlyField";

export const SidebarLayout = ({ children, sidebar }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-200 p-4">
        {sidebar}
        <ReadonlyField label="First Name" name="firstName" />
        <ReadonlyField label="Last Name" name="lastName" />
        <ReadonlyField label="Street Nr." name="streetNr" />
        <ReadonlyField label="City" name="city" />
        <ReadonlyField label="Postal Code" name="postalCode" />
        <ActiveField />
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};
