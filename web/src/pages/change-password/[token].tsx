import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NextLink from "next/link";
import { MyInput } from "../../components/MyInput";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorsDict } from "../../utils/toErrorsDict";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  return (
    <Formik
      initialValues={{ newPassword: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await changePassword({
          variables: {
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          },
        });
        if (response.data?.changePassword.errors) {
          setErrors(toErrorsDict(response.data.changePassword.errors));
        } else if (response.data?.changePassword.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <MyInput
            name="newPassword"
            placeholder="New password"
            label="New password"
            type="password"
          />

          <button
            className="inline-flex items-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {isSubmitting && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Change password
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
