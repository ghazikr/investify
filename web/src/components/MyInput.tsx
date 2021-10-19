import { useField } from "formik";
import React from "react";

interface MyInputProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  textarea?: boolean;
}

export const MyInput: React.FC<MyInputProps> = ({
  label,
  textarea = false,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <div className="mb-4">
      <label className="block text-grey-darker text-sm font-bold mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          {...field}
          {...props}
        />
      ) : (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          {...field}
          {...props}
        />
      )}
      {error ? <p className="text-red-500 text-xs italic">{error}</p> : null}
    </div>
  );
};
