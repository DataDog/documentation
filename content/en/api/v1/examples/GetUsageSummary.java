import com.datadog.api.v2.client.api.UsageApi;

public class UsageApiExample {

    public static void main(String[] args) {
        UsageApi apiInstance = new UsageApi();
        Date startMonth = 2013-10-20T19:20:30+01:00; // Date | Datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage beginning in this month. Maximum of 15 months ago.
        Date endMonth = 2013-10-20T19:20:30+01:00; // Date | Datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage ending this month.
        Boolean includeOrgDetails = true; // Boolean | Include usage summaries for each sub-org.
        try {
            UsageSummaryResponse result = apiInstance.getUsageSummary(startMonth, endMonth, includeOrgDetails);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsageApi#getUsageSummary");
            e.printStackTrace();
        }
    }
}