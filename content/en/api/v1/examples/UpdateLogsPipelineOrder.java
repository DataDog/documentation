import com.datadog.api.v2.client.api.LogsPipelinesApi;

public class LogsPipelinesApiExample {

    public static void main(String[] args) {
        LogsPipelinesApi apiInstance = new LogsPipelinesApi();
        LogsPipelinesOrder body = ; // LogsPipelinesOrder | 
        try {
            LogsPipelinesOrder result = apiInstance.updateLogsPipelineOrder(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsPipelinesApi#updateLogsPipelineOrder");
            e.printStackTrace();
        }
    }
}