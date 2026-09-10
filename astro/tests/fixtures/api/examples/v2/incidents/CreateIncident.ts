// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
/**
 * Create an incident returns "CREATED" response
 */

import { client, v2 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
configuration.unstableOperations["v2.createIncident"] = true;
const apiInstance = new v2.IncidentsApi(configuration);

// there is a valid "user" in the system
const USER_DATA_ID = process.env.USER_DATA_ID as string;

const params: v2.IncidentsApiCreateIncidentRequest = {
  body: {
    data: {
      type: "incidents",
      attributes: {
        title: "Example-Incident",
        customerImpacted: false,
        fields: {
          state: {
            type: "dropdown",
            value: "resolved",
          },
        },
      },
      relationships: {
        commanderUser: {
          data: {
            type: "users",
            id: USER_DATA_ID,
          },
        },
      },
    },
  },
};

apiInstance
  .createIncident(params)
  .then((data: v2.IncidentResponse) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
