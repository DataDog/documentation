import com.datadog.api.v1.client.api.DowntimesApi;

public class DowntimesApiExample {

    public static void main(String[] args) {
        DowntimesApi apiInstance = new DowntimesApi();
        Boolean currentOnly = true; // Boolean | Only return downtimes that are active when the request is made.
        try {
            array[Downtime] result = apiInstance.getAllDowntimes(currentOnly);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DowntimesApi#getAllDowntimes");
            e.printStackTrace();
        }
    }
}