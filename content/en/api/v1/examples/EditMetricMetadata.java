import com.datadog.api.v1.client.api.MetricsApi;

public class MetricsApiExample {

    public static void main(String[] args) {
        MetricsApi apiInstance = new MetricsApi();
        String metricName = metricName_example; // String | Name of the metric for which to edit metadata
        MetricMetadata body = ; // MetricMetadata | 
        try {
            MetricMetadata result = apiInstance.editMetricMetadata(metricName, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MetricsApi#editMetricMetadata");
            e.printStackTrace();
        }
    }
}