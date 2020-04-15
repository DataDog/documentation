import com.datadog.api.v1.client.api.WebhooksIntegrationApi;

public class WebhooksIntegrationApiExample {

    public static void main(String[] args) {
        WebhooksIntegrationApi apiInstance = new WebhooksIntegrationApi();
        String customVariableName = customVariableName_example; // String | The name of the custom variable.
        WebhooksIntegrationCustomVariableUpdateRequest body = ; // WebhooksIntegrationCustomVariableUpdateRequest | 
        try {
            WebhooksIntegrationCustomVariable result = apiInstance.updateWebhooksIntegrationCustomVariable(customVariableName, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling WebhooksIntegrationApi#updateWebhooksIntegrationCustomVariable");
            e.printStackTrace();
        }
    }
}