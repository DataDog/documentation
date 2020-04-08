import com.datadog.api.v1.client.api.KeyManagementApi;

public class KeyManagementApiExample {

    public static void main(String[] args) {
        KeyManagementApi apiInstance = new KeyManagementApi();
        String key = key_example; // String | The specific APP key you are working with.
        ApplicationKey body = ; // ApplicationKey | 
        try {
            ApplicationKeyResponse result = apiInstance.updateApplicationKey(key, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeyManagementApi#updateApplicationKey");
            e.printStackTrace();
        }
    }
}