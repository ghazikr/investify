import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { useIdeaQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

interface IdeaProps {}

const Idea: React.FC<IdeaProps> = ({}) => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data } = useIdeaQuery({ variables: { id } });
  return (
    <Layout>
      {data?.idea && (
        <div>
          <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
            {data.idea.title}
          </h2>
          <p className="leading-relaxed mb-8">{data.idea.description}</p>
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Idea);
