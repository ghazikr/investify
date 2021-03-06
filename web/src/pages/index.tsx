import { IdeaItem } from "../components/IdeaItem";
import { Layout } from "../components/Layout";
import { useIdeasQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

function Home() {
  const { data, fetchMore, variables } = useIdeasQuery({
    variables: {
      limit: 5,
    },
  });

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="">
          {data?.ideas.ideas.map(
            ({
              title,
              cost,
              nbLikes,
              tldr,
              likeStatus,
              id,
              user: { username },
            }) => (
              <IdeaItem
                title={title}
                id={id}
                cost={cost}
                tldr={tldr}
                username={username}
                likeStatus={likeStatus}
                nbLikes={nbLikes}
                key={id}
              />
            )
          )}
          {!data ? (
            <div>loading...</div>
          ) : (
            data?.ideas.hasMore && (
              <div className="p-4 flex justify-center">
                <button
                  onClick={() => {
                    fetchMore({
                      variables: {
                        limit: variables?.limit,
                        cursor:
                          data.ideas.ideas[data.ideas.ideas.length - 1]
                            .createdAt,
                      },
                    });
                  }}
                >
                  <svg
                    className="animate-bounce w-6 h-6 text-indigo-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Home);
