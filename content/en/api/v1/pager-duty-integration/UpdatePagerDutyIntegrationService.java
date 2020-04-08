import com.datadog.api.v1.client.api.PagerDutyIntegrationApi;

public class PagerDutyIntegrationApiExample {

    public static void main(String[] args) {
        PagerDutyIntegrationApi apiInstance = new PagerDutyIntegrationApi();
        String serviceName = serviceName_example; // String | The service name
        PagerDutyServiceKey body = ; // PagerDutyServiceKey | 
        try {
            apiInstance.updatePagerDutyIntegrationService(serviceName, body);
        } catch (ApiException e) {
            System.err.println("Exception when calling PagerDutyIntegrationApi#updatePagerDutyIntegrationService");
            e.printStackTrace();
        }
    }
}