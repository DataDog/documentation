import com.datadog.api.v1.client.api.DashboardListsApi;

public class DashboardListsApiExample {

    public static void main(String[] args) {
        DashboardListsApi apiInstance = new DashboardListsApi();
        DashboardList body = ; // DashboardList | 
        try {
            DashboardList result = apiInstance.createDashboardList(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DashboardListsApi#createDashboardList");
            e.printStackTrace();
        }
    }
}