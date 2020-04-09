import com.datadog.api.v1.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        Long monitorId = 789; // Long | The id of the monitor.
        Monitor body = ; // Monitor | 
        try {
            Monitor result = apiInstance.updateMonitor(monitorId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#updateMonitor");
            e.printStackTrace();
        }
    }
}