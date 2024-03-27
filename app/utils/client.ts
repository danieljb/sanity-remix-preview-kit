import type { ClientConfig } from "@sanity/client";
import { createClient } from "@sanity/client";

export const token =
  typeof process === "undefined" ? "" : process.env.SANITY_API_READ_TOKEN!;

const config: ClientConfig = {
  projectId: "20o7x9lr",
  dataset: "production",
  apiVersion: "2023-06-20",
  useCdn: false,
  perspective: "published",
};

export function getClient(isPreview = false) {
  if (isPreview) {
    return createClient({ ...config, token, perspective: "previewDrafts" });
  }
  return createClient(config);
}
