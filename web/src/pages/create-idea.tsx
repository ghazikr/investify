import { useRouter } from "next/dist/client/router";
import React from "react";
import { Layout } from "../components/Layout";
import { useCreateIdeaMutation } from "../generated/graphql";
import { Formik } from "formik";
import { MyInput } from "../components/MyInput";
import { ActionButton } from "../components/ActionButton";

interface CreateIdeaProps {}

const CreateIdea: React.FC<CreateIdeaProps> = ({}) => {
  const router = useRouter();
  const [createIdea] = useCreateIdeaMutation();

  return (
    <Layout>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <Formik
          initialValues={{
            title: "",
            description: "",
            cost: 0,
          }}
          onSubmit={async (variables) => {
            const { errors } = await createIdea({
              variables,
            });
            if (!errors) {
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
                label="Title"
                name="title"
                type="text"
                placeholder="smartInvestor"
              />
              <MyInput
                label="Description"
                name="description"
                type="text"
                placeholder="description..."
              />
              <MyInput
                label="Cost"
                name="cost"
                type="number"
                placeholder="Cost..."
              />

              <div className="flex items-center justify-between">
                <ActionButton label="Create Idea" isSubmitting={isSubmitting} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default CreateIdea;
