import type { ReactNode } from "react";
import { LiveQueryProvider, useLiveQuery } from "@sanity/preview-kit";
import { useRef } from "react";
import { getClient } from "~/utils/client";

type PreviewPageProps<
  T = { title: string; content: string; isDraft: boolean }
> = {
  initialData: T;
  isPreview: boolean;
  token?: string;
  query: string;
  queryParams: Record<string, string | string[] | number | number[] | boolean>;
};

export type PreviewProps<T = PreviewPageProps> = {
  children: (props: T) => ReactNode;
} & T;

export default function PreviewProvider({
  children,
  token,
  ...props
}: PreviewProps) {
  if (!token) throw new TypeError("Missing token");
  const client = useRef(getClient(true));
  return (
    <LiveQueryProvider
      client={client.current}
      token={token}
      refreshInterval={2000}
    >
      <Preview {...props}>{children}</Preview>
    </LiveQueryProvider>
  );
}

function Preview({ children, ...props }: PreviewProps) {
  const [initialData, isLoading] = useLiveQuery(
    props.initialData,
    props.query,
    props.queryParams
  );

  return (
    <>
      <p>isLoading: {isLoading ? "yes" : "no"}</p>
      {initialData && children({ ...props, initialData })}
    </>
  );
}
