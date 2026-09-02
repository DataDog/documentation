import { resolveSiteEnv } from "@lib/site/siteEnv";

const PROD_IMAGES_URL = "https://docs.dd-static.net";
const STAGING_IMAGES_URL = "https://docs-staging.dd-static.net";

export const IMAGES_URL =
  resolveSiteEnv() === "live" ? PROD_IMAGES_URL : STAGING_IMAGES_URL;
