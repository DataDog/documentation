import com.datadog.api.v1.client.api.LogsPipelinesApi;

public class LogsPipelinesApiExample {

    public static void main(String[] args) {
        LogsPipelinesApi apiInstance = new LogsPipelinesApi();
        LogsPipeline body = ; // LogsPipeline | 
        try {
            LogsPipeline result = apiInstance.createLogsPipeline(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsPipelinesApi#createLogsPipeline");
            e.printStackTrace();
        }
    }
}