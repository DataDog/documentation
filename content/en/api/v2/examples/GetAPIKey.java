import com.datadog.api.v2.client.api.KeysApi;

public class KeysApiExample {

    public static void main(String[] args) {
        KeysApi apiInstance = new KeysApi();
        String key = key_example; // String | The specific API key you are working with
        try {
            ApiKeyResponse result = apiInstance.getAPIKey(key);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeysApi#getAPIKey");
            e.printStackTrace();
        }
    }
}