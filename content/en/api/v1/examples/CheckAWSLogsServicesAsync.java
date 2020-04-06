import com.datadog.api.v1.client.api.AWSLogsIntegrationApi;

public class AWSLogsIntegrationApiExample {

    public static void main(String[] args) {
        AWSLogsIntegrationApi apiInstance = new AWSLogsIntegrationApi();
        AWSLogsServicesRequest body = ; // AWSLogsServicesRequest | 
        try {
            AWSLogsAsyncResponse result = apiInstance.checkAWSLogsServicesAsync(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSLogsIntegrationApi#checkAWSLogsServicesAsync");
            e.printStackTrace();
        }
    }
}