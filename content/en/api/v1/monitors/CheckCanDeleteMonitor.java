import com.datadog.api.v1.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        array[Long] monitorIds = ; // array[Long] | The IDs of the monitor to check.
        try {
            CheckCanDeleteMonitorResponse result = apiInstance.checkCanDeleteMonitor(monitorIds);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#checkCanDeleteMonitor");
            e.printStackTrace();
        }
    }
}