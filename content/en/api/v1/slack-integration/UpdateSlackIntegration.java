import com.datadog.api.v1.client.api.SlackIntegrationApi;

public class SlackIntegrationApiExample {

    public static void main(String[] args) {
        SlackIntegrationApi apiInstance = new SlackIntegrationApi();
        SlackChannels body = ; // SlackChannels | 
        try {
            apiInstance.updateSlackIntegration(body);
        } catch (ApiException e) {
            System.err.println("Exception when calling SlackIntegrationApi#updateSlackIntegration");
            e.printStackTrace();
        }
    }
}