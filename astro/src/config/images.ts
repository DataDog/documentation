const PROD_IMAGES_URL = "https://docs.dd-static.net";
const DEV_IMAGES_URL = "http://docs-staging.dd-static.net";

export const IMAGES_URL = import.meta.env.PROD
  ? PROD_IMAGES_URL
  : DEV_IMAGES_URL;
