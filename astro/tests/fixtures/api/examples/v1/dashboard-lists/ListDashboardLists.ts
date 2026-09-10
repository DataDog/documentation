// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
/**
 * Get all dashboard lists returns "OK" response
 */

import { client, v1 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v1.DashboardListsApi(configuration);

apiInstance
  .listDashboardLists()
  .then((data: v1.DashboardListListResponse) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
