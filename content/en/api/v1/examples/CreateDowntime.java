import com.datadog.api.v1.client.api.DowntimesApi;

public class DowntimesApiExample {

    public static void main(String[] args) {
        DowntimesApi apiInstance = new DowntimesApi();
        Downtime body = ; // Downtime | 
        try {
            Downtime result = apiInstance.createDowntime(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DowntimesApi#createDowntime");
            e.printStackTrace();
        }
    }
}