import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
  useTestQuery,
} from "../generated/graphql";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data } = useTestQuery({});
  const [login, { loading }] = useLoginMutation({
    variables: {
      email,
      password,
    },
  });
  console.log({ data });

  const handleSubmit = async () => {
    const response = await login({
      update: (cache, { data }) => {
        cache.writeQuery<CurrentUserQuery>({
          query: CurrentUserDocument,
          data: {
            __typename: "Query",
            currentUser: data.login,
          },
        });
      },
    });
    if (response.data.login) {
      router.push("/");
    }
  };

  return (
    <Layout>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******************"
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
