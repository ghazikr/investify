import { useRouter } from "next/dist/client/router";
import React from "react";
import { Layout } from "../components/Layout";
import { useRegisterMutation } from "../generated/graphql";
import { Formik } from "formik";
import { MyInput } from "../components/MyInput";
import { toErrorsDict } from "../utils/toErrorsDict";
import { ActionButton } from "../components/ActionButton";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Layout>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          onSubmit={async (options, { setErrors }) => {
            const response = await register({
              variables: { options },
            });
            if (response.data?.register.errors) {
              setErrors(toErrorsDict(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
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
                label="Username"
                name="username"
                type="text"
                placeholder="smartInvestor"
              />
              <MyInput
                label="Email"
                name="email"
                type="text"
                placeholder="test@test.com"
              />
              <MyInput
                label="Password"
                name="password"
                type="password"
                placeholder="*******"
              />

              <div className="flex items-center justify-between">
                <ActionButton label="Register" isSubmitting={isSubmitting} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Register;
