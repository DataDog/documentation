import com.datadog.api.v1.client.api.HostsApi;

public class HostsApiExample {

    public static void main(String[] args) {
        HostsApi apiInstance = new HostsApi();
        Long from = 789; // Long | Number of seconds from which you want to get total number of active hosts
        try {
            HostTotals result = apiInstance.getHostTotals(from);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling HostsApi#getHostTotals");
            e.printStackTrace();
        }
    }
}