// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// Validate API key returns "OK" response

import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.v1.api.AuthenticationApi;
import com.datadog.api.client.v1.model.AuthenticationValidationResponse;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = ApiClient.getDefaultApiClient();
    AuthenticationApi apiInstance = new AuthenticationApi(defaultClient);

    try {
      AuthenticationValidationResponse result = apiInstance.validate();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AuthenticationApi#validate");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
