import React from "react";
import { Layout } from "../components/Layout";
import { useForgotPasswordMutation } from "../generated/graphql";
import { Formik } from "formik";
import { MyInput } from "../components/MyInput";
import { ActionButton } from "../components/ActionButton";

interface loginProps {}

const ForgotPassword: React.FC<loginProps> = ({}) => {
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Layout>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async (variables) => {
            await forgotPassword({
              variables,
            });
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <MyInput
                label="email"
                name="email"
                type="text"
                placeholder="test@test.com"
              />

              <div className="flex items-center justify-between">
                <ActionButton
                  label="Request password"
                  isSubmitting={isSubmitting}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
