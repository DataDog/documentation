import com.datadog.api.v1.client.api.LogsPipelinesApi;

public class LogsPipelinesApiExample {

    public static void main(String[] args) {
        LogsPipelinesApi apiInstance = new LogsPipelinesApi();
        try {
            LogsPipelineList result = apiInstance.getAllLogsPipelines();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsPipelinesApi#getAllLogsPipelines");
            e.printStackTrace();
        }
    }
}