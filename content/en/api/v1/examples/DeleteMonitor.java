import com.datadog.api.v2.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        Long monitorId = 789; // Long | The id of the monitor
        try {
            DeletedMonitor result = apiInstance.deleteMonitor(monitorId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#deleteMonitor");
            e.printStackTrace();
        }
    }
}