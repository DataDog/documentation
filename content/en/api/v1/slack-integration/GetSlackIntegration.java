import com.datadog.api.v1.client.api.SlackIntegrationApi;

public class SlackIntegrationApiExample {

    public static void main(String[] args) {
        SlackIntegrationApi apiInstance = new SlackIntegrationApi();
        try {
            Object result = apiInstance.getSlackIntegration();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SlackIntegrationApi#getSlackIntegration");
            e.printStackTrace();
        }
    }
}