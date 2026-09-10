// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// Create an incident returns "CREATED" response

import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.v2.api.IncidentsApi;
import com.datadog.api.client.v2.model.IncidentCreateAttributes;
import com.datadog.api.client.v2.model.IncidentCreateData;
import com.datadog.api.client.v2.model.IncidentCreateRelationships;
import com.datadog.api.client.v2.model.IncidentCreateRequest;
import com.datadog.api.client.v2.model.IncidentFieldAttributes;
import com.datadog.api.client.v2.model.IncidentFieldAttributesSingleValue;
import com.datadog.api.client.v2.model.IncidentFieldAttributesSingleValueType;
import com.datadog.api.client.v2.model.IncidentResponse;
import com.datadog.api.client.v2.model.IncidentType;
import com.datadog.api.client.v2.model.NullableRelationshipToUser;
import com.datadog.api.client.v2.model.NullableRelationshipToUserData;
import com.datadog.api.client.v2.model.UsersType;
import java.util.Map;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = ApiClient.getDefaultApiClient();
    defaultClient.setUnstableOperationEnabled("v2.createIncident", true);
    IncidentsApi apiInstance = new IncidentsApi(defaultClient);

    // there is a valid "user" in the system
    String USER_DATA_ID = System.getenv("USER_DATA_ID");

    IncidentCreateRequest body =
        new IncidentCreateRequest()
            .data(
                new IncidentCreateData()
                    .type(IncidentType.INCIDENTS)
                    .attributes(
                        new IncidentCreateAttributes()
                            .title("Example-Incident")
                            .customerImpacted(false)
                            .fields(
                                Map.ofEntries(
                                    Map.entry(
                                        "state",
                                        new IncidentFieldAttributes(
                                            new IncidentFieldAttributesSingleValue()
                                                .type(
                                                    IncidentFieldAttributesSingleValueType.DROPDOWN)
                                                .value("resolved"))))))
                    .relationships(
                        new IncidentCreateRelationships()
                            .commanderUser(
                                new NullableRelationshipToUser()
                                    .data(
                                        new NullableRelationshipToUserData()
                                            .type(UsersType.USERS)
                                            .id(USER_DATA_ID)))));

    try {
      IncidentResponse result = apiInstance.createIncident(body);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IncidentsApi#createIncident");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
