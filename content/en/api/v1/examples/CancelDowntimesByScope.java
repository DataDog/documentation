import com.datadog.api.v2.client.api.DowntimesApi;

public class DowntimesApiExample {

    public static void main(String[] args) {
        DowntimesApi apiInstance = new DowntimesApi();
        CancelDowntimesByScopeRequest body = ; // CancelDowntimesByScopeRequest | 
        try {
            CanceledDowntimesIds result = apiInstance.cancelDowntimesByScope(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DowntimesApi#cancelDowntimesByScope");
            e.printStackTrace();
        }
    }
}