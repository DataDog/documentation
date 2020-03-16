import com.datadog.api.v2.client.api.HostsApi;

public class HostsApiExample {

    public static void main(String[] args) {
        HostsApi apiInstance = new HostsApi();
        String filter = filter_example; // String | String to filter search results
        String sortField = sortField_example; // String | Sort hosts by this field
        String sortDir = sortDir_example; // String | Direction of sort
        Long start = 789; // Long | Host result to start search from
        Long count = 789; // Long | Number of hosts to return
        Long from = 789; // Long | Number of seconds from which you want to search your hosts
        try {
            HostListResponse result = apiInstance.getAllHosts(filter, sortField, sortDir, start, count, from);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling HostsApi#getAllHosts");
            e.printStackTrace();
        }
    }
}