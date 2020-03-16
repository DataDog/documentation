import com.datadog.api.v2.client.api.UsageApi;

public class UsageApiExample {

    public static void main(String[] args) {
        UsageApi apiInstance = new UsageApi();
        Date startHr = 2013-10-20T19:20:30+01:00; // Date | Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
        Date endHr = 2013-10-20T19:20:30+01:00; // Date | Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour
        try {
            UsageHostsResponse result = apiInstance.getUsageHosts(startHr, endHr);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsageApi#getUsageHosts");
            e.printStackTrace();
        }
    }
}