import com.datadog.api.v1.client.api.KeyManagementApi;

public class KeyManagementApiExample {

    public static void main(String[] args) {
        KeyManagementApi apiInstance = new KeyManagementApi();
        String key = key_example; // String | The specific APP key you are working with.
        try {
            ApplicationKeyResponse result = apiInstance.deleteApplicationKey(key);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeyManagementApi#deleteApplicationKey");
            e.printStackTrace();
        }
    }
}