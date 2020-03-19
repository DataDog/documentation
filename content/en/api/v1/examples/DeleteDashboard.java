import com.datadog.api.v1.client.api.DashboardsApi;

public class DashboardsApiExample {

    public static void main(String[] args) {
        DashboardsApi apiInstance = new DashboardsApi();
        String dashboardId = dashboardId_example; // String | The id of the dashboard
        try {
            DashboardDeleteResponse result = apiInstance.deleteDashboard(dashboardId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DashboardsApi#deleteDashboard");
            e.printStackTrace();
        }
    }
}