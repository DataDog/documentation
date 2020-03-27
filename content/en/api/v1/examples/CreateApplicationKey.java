import com.datadog.api.v1.client.api.KeyManagementApi;

public class KeyManagementApiExample {

    public static void main(String[] args) {
        KeyManagementApi apiInstance = new KeyManagementApi();
        ApplicationKey body = ; // ApplicationKey | 
        try {
            ApplicationKeyResponse result = apiInstance.createApplicationKey(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling KeyManagementApi#createApplicationKey");
            e.printStackTrace();
        }
    }
}