import com.datadog.api.v1.client.api.KeysApi;

public class KeysApiExample {

    public static void main(String[] args) {
        KeysApi apiInstance = new KeysApi();
        String key = key_example; // String | The specific APP key you are working with.
        try {
            ApplicationKeyResponse result = apiInstance.getApplicationKey(key);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeysApi#getApplicationKey");
            e.printStackTrace();
        }
    }
}