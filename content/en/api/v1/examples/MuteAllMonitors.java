import com.datadog.api.v1.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        try {
            Monitor result = apiInstance.muteAllMonitors();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#muteAllMonitors");
            e.printStackTrace();
        }
    }
}