import com.datadog.api.v1.client.api.PagerDutyIntegrationApi;

public class PagerDutyIntegrationApiExample {

    public static void main(String[] args) {
        PagerDutyIntegrationApi apiInstance = new PagerDutyIntegrationApi();
        String serviceName = serviceName_example; // String | The service name
        try {
            PagerDutyServiceName result = apiInstance.getPagerDutyIntegrationService(serviceName);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling PagerDutyIntegrationApi#getPagerDutyIntegrationService");
            e.printStackTrace();
        }
    }
}