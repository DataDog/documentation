import com.datadog.api.v1.client.api.MetricsApi;

public class MetricsApiExample {

    public static void main(String[] args) {
        MetricsApi apiInstance = new MetricsApi();
        Long from = 789; // Long | Seconds since the Unix epoch
        String host = host_example; // String | Hostname for filtering the list of metrics returned. If set, metrics retrieved are those with the corresponding hostname tag.
        try {
            MetricsListResponse result = apiInstance.getAllActiveMetrics(from, host);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MetricsApi#getAllActiveMetrics");
            e.printStackTrace();
        }
    }
}