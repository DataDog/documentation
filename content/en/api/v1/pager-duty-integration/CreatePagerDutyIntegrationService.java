import com.datadog.api.v1.client.api.PagerDutyIntegrationApi;

public class PagerDutyIntegrationApiExample {

    public static void main(String[] args) {
        PagerDutyIntegrationApi apiInstance = new PagerDutyIntegrationApi();
        PagerDutyService body = ; // PagerDutyService | 
        try {
            PagerDutyServiceName result = apiInstance.createPagerDutyIntegrationService(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling PagerDutyIntegrationApi#createPagerDutyIntegrationService");
            e.printStackTrace();
        }
    }
}