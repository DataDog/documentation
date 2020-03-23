import com.datadog.api.v1.client.api.PagerDutyIntegrationApi;

public class PagerDutyIntegrationApiExample {

    public static void main(String[] args) {
        PagerDutyIntegrationApi apiInstance = new PagerDutyIntegrationApi();
        PagerDutyIntegration body = ; // PagerDutyIntegration | 
        try {
            apiInstance.createPagerDutyIntegration(body);
        } catch (ApiException e) {
            System.err.println("Exception when calling PagerDutyIntegrationApi#createPagerDutyIntegration");
            e.printStackTrace();
        }
    }
}