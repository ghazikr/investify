import React from "react";
import { gql, useQuery } from "@apollo/client";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const { data } = useQuery(
    gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `
  );
  console.log({ data });
  return <div>login page</div>;
};

export default Login;
