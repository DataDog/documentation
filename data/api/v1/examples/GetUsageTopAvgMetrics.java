import com.datadog.api.v1.client.api.UsageApi;

public class UsageApiExample {

    public static void main(String[] args) {
        UsageApi apiInstance = new UsageApi();
        Date month = 2013-10-20T19:20:30+01:00; // Date | Datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage beginning at this hour.
        array[String] names = ; // array[String] | Comma-separated list of metric names.
        try {
            UsageTopAvgMetricsResponse result = apiInstance.getUsageTopAvgMetrics(month, names);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsageApi#getUsageTopAvgMetrics");
            e.printStackTrace();
        }
    }
}