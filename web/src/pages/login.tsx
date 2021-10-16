import { useRouter } from "next/dist/client/router";
import React from "react";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
} from "../generated/graphql";
import { Formik } from "formik";
import { MyInput } from "../components/MyInput";
import { toErrorsDict } from "../utils/toErrorsDict";
import { ActionButton } from "../components/ActionButton";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Layout>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (variables, { setErrors }) => {
            const response = await login({
              variables,
              update: (cache, { data }) => {
                cache.writeQuery<CurrentUserQuery>({
                  query: CurrentUserDocument,
                  data: {
                    __typename: "Query",
                    currentUser: data?.login?.user,
                  },
                });
              },
            });

            if (response.data?.login.errors) {
              setErrors(toErrorsDict(response.data.login.errors));
            } else if (response.data?.login.user) {
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
                label="email"
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
                <ActionButton label="Sign In" isSubmitting={isSubmitting} />
                <NextLink href="/forgot-password">
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </NextLink>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Login;
