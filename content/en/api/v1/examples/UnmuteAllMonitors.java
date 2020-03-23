import com.datadog.api.v1.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        try {
            apiInstance.unmuteAllMonitors();
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#unmuteAllMonitors");
            e.printStackTrace();
        }
    }
}