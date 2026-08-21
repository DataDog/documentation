const PROD_IMAGES_URL = "https://docs.dd-static.net";
const STAGING_IMAGES_URL = "https://docs-staging.dd-static.net";

const isLive = process.env.CI_ENVIRONMENT_NAME === "live";

export const IMAGES_URL = isLive ? PROD_IMAGES_URL : STAGING_IMAGES_URL;
