import { useRouter } from "next/dist/client/router";
import React from "react";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
  useTestQuery,
} from "../generated/graphql";
import { Formik } from "formik";
import { MyInput } from "../components/MyInput";

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
          onSubmit={async (variables) => {
            const response = await login({
              variables,
              update: (cache, { data }) => {
                cache.writeQuery<CurrentUserQuery>({
                  query: CurrentUserDocument,
                  data: {
                    // __typename: "Query",
                    currentUser: data.login,
                  },
                });
              },
            });
            if (response.data.login) {
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
                  Sign In
                </button>
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
