import { useField } from "formik";
import React from "react";

interface MyInputProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

export const MyInput: React.FC<MyInputProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <div className="mb-4">
      <label className="block text-grey-darker text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        {...field}
        {...props}
      />
    </div>
  );
};
