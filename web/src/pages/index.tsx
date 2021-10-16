import { IdeaItem } from "../components/IdeaItem";
import { Layout } from "../components/Layout";
import { useIdeasQuery } from "../generated/graphql";

export default function Home() {
  const { data } = useIdeasQuery();
  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="">
            {data?.ideas.map(({ title, cost, description, id }) => (
              <IdeaItem
                title={title}
                cost={cost}
                description={description}
                key={id}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
