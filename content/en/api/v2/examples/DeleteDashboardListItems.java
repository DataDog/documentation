import com.datadog.api.v2.client.api.DashboardListsApi;

public class DashboardListsApiExample {

    public static void main(String[] args) {
        DashboardListsApi apiInstance = new DashboardListsApi();
        Long dashboardListId = 789; // Long | ID of the dashboard list to delete items from
        DashboardListItems body = ; // DashboardListItems | 
        try {
            DashboardListDeleteItemsResponse result = apiInstance.deleteDashboardListItems(dashboardListId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DashboardListsApi#deleteDashboardListItems");
            e.printStackTrace();
        }
    }
}