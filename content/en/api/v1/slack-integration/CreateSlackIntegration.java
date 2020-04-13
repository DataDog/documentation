import com.datadog.api.v1.client.api.SlackIntegrationApi;

public class SlackIntegrationApiExample {

    public static void main(String[] args) {
        SlackIntegrationApi apiInstance = new SlackIntegrationApi();
        SlackIntegration body = ; // SlackIntegration | 
        try {
            apiInstance.createSlackIntegration(body);
        } catch (ApiException e) {
            System.err.println("Exception when calling SlackIntegrationApi#createSlackIntegration");
            e.printStackTrace();
        }
    }
}