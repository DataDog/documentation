import com.datadog.api.v1.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        Long monitorId = 789; // Long | The id of the monitor
        String groupStates = groupStates_example; // String | When specified, shows additional information about the group states. Choose one or more from `all`, `alert`, `warn`, and `no data`.
        try {
            Monitor result = apiInstance.getMonitor(monitorId, groupStates);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#getMonitor");
            e.printStackTrace();
        }
    }
}