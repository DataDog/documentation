import com.datadog.api.v1.client.api.WebhooksIntegrationApi;

public class WebhooksIntegrationApiExample {

    public static void main(String[] args) {
        WebhooksIntegrationApi apiInstance = new WebhooksIntegrationApi();
        WebhooksIntegration body = ; // WebhooksIntegration | 
        try {
            WebhooksIntegration result = apiInstance.createWebhooksIntegration(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling WebhooksIntegrationApi#createWebhooksIntegration");
            e.printStackTrace();
        }
    }
}