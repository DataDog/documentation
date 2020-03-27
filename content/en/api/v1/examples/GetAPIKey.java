import com.datadog.api.v1.client.api.KeyManagementApi;

public class KeyManagementApiExample {

    public static void main(String[] args) {
        KeyManagementApi apiInstance = new KeyManagementApi();
        String key = key_example; // String | The specific API key you are working with.
        try {
            ApiKeyResponse result = apiInstance.getAPIKey(key);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeyManagementApi#getAPIKey");
            e.printStackTrace();
        }
    }
}