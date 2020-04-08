import com.datadog.api.v1.client.api.DashboardsApi;

public class DashboardsApiExample {

    public static void main(String[] args) {
        DashboardsApi apiInstance = new DashboardsApi();
        String dashboardId = dashboardId_example; // String | The id of the dashboard
        Dashboard body = ; // Dashboard | 
        try {
            Dashboard result = apiInstance.updateDashboard(dashboardId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DashboardsApi#updateDashboard");
            e.printStackTrace();
        }
    }
}