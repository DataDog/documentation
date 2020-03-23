import com.datadog.api.v1.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        Long monitorId = 789; // Long | The id of the monitor
        String scope = role:db; // String | The scope to apply the mute to.
For example, if your alert is grouped by `{host}`, you might mute `host:app1`.
        Long end = 789; // Long | A POSIX timestamp for when the mute should end.
        try {
            Monitor result = apiInstance.muteMonitor(monitorId, scope, end);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#muteMonitor");
            e.printStackTrace();
        }
    }
}