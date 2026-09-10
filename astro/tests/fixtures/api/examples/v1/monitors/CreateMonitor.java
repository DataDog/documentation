// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// Create a monitor returns "OK" response

import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.v1.api.MonitorsApi;
import com.datadog.api.client.v1.model.Monitor;
import com.datadog.api.client.v1.model.MonitorType;
import java.util.Arrays;
import java.util.Collections;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = ApiClient.getDefaultApiClient();
    MonitorsApi apiInstance = new MonitorsApi(defaultClient);

    // there is a valid "role" in the system
    String ROLE_DATA_ID = System.getenv("ROLE_DATA_ID");

    Monitor body =
        new Monitor()
            .name("Example-Monitor")
            .type(MonitorType.LOG_ALERT)
            .query(
                """
logs("service:foo AND type:error").index("main").rollup("count").by("source").last("5m") > 2
""")
            .message("some message Notify: @hipchat-channel")
            .tags(Arrays.asList("test:examplemonitor", "env:ci"))
            .priority(3L)
            .restrictedRoles(Collections.singletonList(ROLE_DATA_ID));

    try {
      Monitor result = apiInstance.createMonitor(body);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling MonitorsApi#createMonitor");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
