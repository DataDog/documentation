import com.datadog.api.v1.client.api.DashboardsApi;

public class DashboardsApiExample {

    public static void main(String[] args) {
        DashboardsApi apiInstance = new DashboardsApi();
        try {
            DashboardSummary result = apiInstance.listDashboards();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DashboardsApi#listDashboards");
            e.printStackTrace();
        }
    }
}