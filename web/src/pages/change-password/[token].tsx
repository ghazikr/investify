import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { MyInput } from "../../components/MyInput";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorsDict } from "../../utils/toErrorsDict";
import { ActionButton } from "../../components/ActionButton";
import { withApollo } from "../../utils/withApollo";

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
          <ActionButton label="Change password" isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
