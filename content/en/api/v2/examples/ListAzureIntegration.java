import com.datadog.api.v2.client.api.AzureIntegrationApi;

public class AzureIntegrationApiExample {

    public static void main(String[] args) {
        AzureIntegrationApi apiInstance = new AzureIntegrationApi();
        try {
            array[AzureAccount] result = apiInstance.listAzureIntegration();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AzureIntegrationApi#listAzureIntegration");
            e.printStackTrace();
        }
    }
}