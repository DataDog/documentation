import com.datadog.api.v1.client.api.GCPIntegrationApi;

public class GCPIntegrationApiExample {

    public static void main(String[] args) {
        GCPIntegrationApi apiInstance = new GCPIntegrationApi();
        try {
            GCPAccountListResponse result = apiInstance.listGCPIntegration();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling GCPIntegrationApi#listGCPIntegration");
            e.printStackTrace();
        }
    }
}