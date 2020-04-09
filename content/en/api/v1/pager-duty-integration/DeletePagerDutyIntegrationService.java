import com.datadog.api.v1.client.api.PagerDutyIntegrationApi;

public class PagerDutyIntegrationApiExample {

    public static void main(String[] args) {
        PagerDutyIntegrationApi apiInstance = new PagerDutyIntegrationApi();
        String serviceName = serviceName_example; // String | The service name
        try {
            apiInstance.deletePagerDutyIntegrationService(serviceName);
        } catch (ApiException e) {
            System.err.println("Exception when calling PagerDutyIntegrationApi#deletePagerDutyIntegrationService");
            e.printStackTrace();
        }
    }
}