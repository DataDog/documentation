import com.datadog.api.v2.client.api.MetricsApi;

public class MetricsApiExample {

    public static void main(String[] args) {
        MetricsApi apiInstance = new MetricsApi();
        String q = q_example; // String | Query string to search metrics upon. Must be prefixed with `metrics:`
        try {
            MetricSearchResponse result = apiInstance.searchMetrics(q);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MetricsApi#searchMetrics");
            e.printStackTrace();
        }
    }
}