import com.datadog.api.v2.client.api.MetricsApi;

public class MetricsApiExample {

    public static void main(String[] args) {
        MetricsApi apiInstance = new MetricsApi();
        Long from = 789; // Long | Start of the queried time period, seconds since the Unix epoch
        Long to = 789; // Long | End of the queried time period, seconds since the Unix epoch
        String query = query_example; // String | Query string
        try {
            MetricsQueryResponse result = apiInstance.queryMetrics(from, to, query);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MetricsApi#queryMetrics");
            e.printStackTrace();
        }
    }
}