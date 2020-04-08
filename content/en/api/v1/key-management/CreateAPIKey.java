import com.datadog.api.v1.client.api.KeyManagementApi;

public class KeyManagementApiExample {

    public static void main(String[] args) {
        KeyManagementApi apiInstance = new KeyManagementApi();
        ApiKey body = ; // ApiKey | 
        try {
            ApiKeyResponse result = apiInstance.createAPIKey(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeyManagementApi#createAPIKey");
            e.printStackTrace();
        }
    }
}