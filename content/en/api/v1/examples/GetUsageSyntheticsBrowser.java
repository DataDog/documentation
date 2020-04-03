import com.datadog.api.v1.client.api.UsageMeteringApi;

public class UsageMeteringApiExample {

    public static void main(String[] args) {
        UsageMeteringApi apiInstance = new UsageMeteringApi();
        Date startHr = 2013-10-20T19:20:30+01:00; // Date | Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
        Date endHr = 2013-10-20T19:20:30+01:00; // Date | Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour
        try {
            UsageSyntheticsBrowserResponse result = apiInstance.getUsageSyntheticsBrowser(startHr, endHr);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsageMeteringApi#getUsageSyntheticsBrowser");
            e.printStackTrace();
        }
    }
}