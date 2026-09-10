// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
/**
 * Get a dashboard returns "OK" response
 */

import { client, v1 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v1.DashboardsApi(configuration);

// there is a valid "dashboard" in the system
const DASHBOARD_ID = process.env.DASHBOARD_ID as string;

const params: v1.DashboardsApiGetDashboardRequest = {
  dashboardId: DASHBOARD_ID,
};

apiInstance
  .getDashboard(params)
  .then((data: v1.Dashboard) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
