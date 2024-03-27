import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { lazy, Suspense } from "react";
import { getClient } from "~/utils/client";

const PreviewProvider = lazy(() => import("~/components/PreviewProvider"));

export const meta: MetaFunction = () => {
  return [
    { title: "Remix+Sanity+Preview Kit" },
    {
      name: "description",
      content: "Welcome to Remix+Sanity+Preview Kit App!",
    },
  ];
};

export async function loader() {
  const isPreview = true;
  const token = process.env.SANITY_API_READ_TOKEN!;
  const client = getClient(isPreview);

  const query = `*[_type == "post"][0] {
    title,
    "content": pt::text(content),
    "isDraft": defined(_originalId) && _originalId in path("drafts.**"),
  }`;
  const queryParams = {};

  const initialData = await client.fetch<{
    title: string;
    content: string;
    isDraft: boolean;
  }>(query, queryParams);

  return { initialData, isPreview, query, queryParams, token };
}

function DataDisplay(props: Record<string, unknown>) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const children = <DataDisplay {...data} />;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix+Sanity+Preview Kit</h1>
      {data.isPreview ? (
        <Suspense fallback={children}>
          <PreviewProvider {...data}>
            {(props) => <DataDisplay {...props} />}
          </PreviewProvider>
        </Suspense>
      ) : (
        children
      )}
    </div>
  );
}
