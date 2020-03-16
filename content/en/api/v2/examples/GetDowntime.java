import com.datadog.api.v2.client.api.DowntimesApi;

public class DowntimesApiExample {

    public static void main(String[] args) {
        DowntimesApi apiInstance = new DowntimesApi();
        Long downtimeId = 123456; // Long | ID of the downtime to fetch
        try {
            Downtime result = apiInstance.getDowntime(downtimeId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DowntimesApi#getDowntime");
            e.printStackTrace();
        }
    }
}