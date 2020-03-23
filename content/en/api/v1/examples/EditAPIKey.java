import com.datadog.api.v1.client.api.KeysApi;

public class KeysApiExample {

    public static void main(String[] args) {
        KeysApi apiInstance = new KeysApi();
        String key = key_example; // String | The specific API key you are working with.
        ApiKey body = ; // ApiKey | 
        try {
            ApiKeyResponse result = apiInstance.editAPIKey(key, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeysApi#editAPIKey");
            e.printStackTrace();
        }
    }
}