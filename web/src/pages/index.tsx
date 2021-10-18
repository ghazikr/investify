import { IdeaItem } from "../components/IdeaItem";
import { Layout } from "../components/Layout";
import { useIdeasQuery } from "../generated/graphql";

export default function Home() {
  const { data, fetchMore, variables } = useIdeasQuery({
    variables: {
      limit: 2,
    },
  });
  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="">
            {data?.ideas.ideas.map(({ title, cost, description, id }) => (
              <IdeaItem
                title={title}
                cost={cost}
                description={description}
                key={id}
              />
            ))}
            {data?.ideas.hasMore && (
              <button
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data.ideas.ideas[data.ideas.ideas.length - 1].createdAt,
                    },
                  });
                }}
              >
                load more
              </button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
