import { Studio, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const config = defineConfig({
  basePath: "/admin",
  plugins: [structureTool()],
  name: "remix-sanity-preview-kit",
  projectId: "20o7x9lr",
  dataset: "production",
  schema: {
    types: [
      {
        type: "document",
        name: "post",
        title: "Post",
        fields: [
          {
            type: "string",
            name: "title",
            title: "Title",
          },
          {
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
          },
        ],
      },
    ],
  },
});

export default function Admin() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body { margin: 0; }` }} />
      <div
        id="app"
        style={{
          height: "100vh",
          maxHeight: "100dvh",
          overscrollBehavior: "none",
          overflow: "auto",
        }}
      >
        <Studio config={config} />
      </div>
    </>
  );
}
