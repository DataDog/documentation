import com.datadog.api.v1.client.api.AWSLogsIntegrationApi;

public class AWSLogsIntegrationApiExample {

    public static void main(String[] args) {
        AWSLogsIntegrationApi apiInstance = new AWSLogsIntegrationApi();
        AWSLogsServicesRequest body = ; // AWSLogsServicesRequest | 
        try {
            AWSLogsAsyncResponse result = apiInstance.aWSLogsCheckServicesAsync(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSLogsIntegrationApi#aWSLogsCheckServicesAsync");
            e.printStackTrace();
        }
    }
}