import com.datadog.api.v1.client.api.GCPIntegrationApi;

public class GCPIntegrationApiExample {

    public static void main(String[] args) {
        GCPIntegrationApi apiInstance = new GCPIntegrationApi();
        GCPAccount body = ; // GCPAccount | 
        try {
            Object result = apiInstance.deleteGCPIntegration(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling GCPIntegrationApi#deleteGCPIntegration");
            e.printStackTrace();
        }
    }
}