import com.datadog.api.v1.client.api.KeysApi;

public class KeysApiExample {

    public static void main(String[] args) {
        KeysApi apiInstance = new KeysApi();
        ApplicationKey body = ; // ApplicationKey | 
        try {
            ApplicationKeyResponse result = apiInstance.createApplicationKey(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeysApi#createApplicationKey");
            e.printStackTrace();
        }
    }
}