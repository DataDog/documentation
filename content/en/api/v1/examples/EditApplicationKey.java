import com.datadog.api.v1.client.api.KeysApi;

public class KeysApiExample {

    public static void main(String[] args) {
        KeysApi apiInstance = new KeysApi();
        String key = key_example; // String | The specific APP key you are working with.
        ApplicationKey body = ; // ApplicationKey | 
        try {
            ApplicationKeyResponse result = apiInstance.editApplicationKey(key, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeysApi#editApplicationKey");
            e.printStackTrace();
        }
    }
}