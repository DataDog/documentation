import com.datadog.api.v2.client.api.DashboardListsApi;

public class DashboardListsApiExample {

    public static void main(String[] args) {
        DashboardListsApi apiInstance = new DashboardListsApi();
        Long dashboardListId = 789; // Long | ID of the dashboard list to add items to
        DashboardListItems body = ; // DashboardListItems | 
        try {
            DashboardListAddItemsResponse result = apiInstance.addDashboardListItems(dashboardListId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DashboardListsApi#addDashboardListItems");
            e.printStackTrace();
        }
    }
}