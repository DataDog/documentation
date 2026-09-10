// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
/**
 * Get hourly usage for Lambda returns "OK" response
 */

import { client, v1 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v1.UsageMeteringApi(configuration);

const params: v1.UsageMeteringApiGetUsageLambdaRequest = {
  startHr: new Date(new Date().getTime() + -5 * 86400 * 1000),
  endHr: new Date(new Date().getTime() + -3 * 86400 * 1000),
};

apiInstance
  .getUsageLambda(params)
  .then((data: v1.UsageLambdaResponse) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
