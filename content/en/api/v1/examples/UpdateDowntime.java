import com.datadog.api.v2.client.api.DowntimesApi;

public class DowntimesApiExample {

    public static void main(String[] args) {
        DowntimesApi apiInstance = new DowntimesApi();
        Long downtimeId = 123456; // Long | ID of the downtime to update
        Downtime body = ; // Downtime | 
        try {
            Downtime result = apiInstance.updateDowntime(downtimeId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DowntimesApi#updateDowntime");
            e.printStackTrace();
        }
    }
}