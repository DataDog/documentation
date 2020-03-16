import com.datadog.api.v2.client.api.DowntimesApi;

public class DowntimesApiExample {

    public static void main(String[] args) {
        DowntimesApi apiInstance = new DowntimesApi();
        Long downtimeId = 123456; // Long | ID of the downtime to cancel
        try {
            apiInstance.cancelDowntime(downtimeId);
        } catch (ApiException e) {
            System.err.println("Exception when calling DowntimesApi#cancelDowntime");
            e.printStackTrace();
        }
    }
}