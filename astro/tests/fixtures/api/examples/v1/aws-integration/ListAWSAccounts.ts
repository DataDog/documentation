// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
/**
 * List all AWS integrations returns "OK" response
 */

import { client, v1 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v1.AWSIntegrationApi(configuration);

apiInstance
  .listAWSAccounts()
  .then((data: v1.AWSAccountListResponse) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
