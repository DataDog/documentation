import com.datadog.api.v2.client.api.LogsPipelinesApi;

public class LogsPipelinesApiExample {

    public static void main(String[] args) {
        LogsPipelinesApi apiInstance = new LogsPipelinesApi();
        try {
            LogsPipelinesOrder result = apiInstance.getLogsPipelineOrder();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsPipelinesApi#getLogsPipelineOrder");
            e.printStackTrace();
        }
    }
}