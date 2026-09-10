// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
/**
 * Validate API key returns "OK" response
 */

import { client, v1 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v1.AuthenticationApi(configuration);

apiInstance
  .validate()
  .then((data: v1.AuthenticationValidationResponse) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
