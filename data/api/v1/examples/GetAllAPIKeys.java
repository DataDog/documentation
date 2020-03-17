import com.datadog.api.v1.client.api.KeysApi;

public class KeysApiExample {

    public static void main(String[] args) {
        KeysApi apiInstance = new KeysApi();
        try {
            ApiKeyListResponse result = apiInstance.getAllAPIKeys();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeysApi#getAllAPIKeys");
            e.printStackTrace();
        }
    }
}