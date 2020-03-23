import com.datadog.api.v1.client.api.KeysApi;

public class KeysApiExample {

    public static void main(String[] args) {
        KeysApi apiInstance = new KeysApi();
        ApiKey body = ; // ApiKey | 
        try {
            ApiKeyResponse result = apiInstance.createAPIKey(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeysApi#createAPIKey");
            e.printStackTrace();
        }
    }
}