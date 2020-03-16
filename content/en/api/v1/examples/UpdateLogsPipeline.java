import com.datadog.api.v2.client.api.LogsPipelinesApi;

public class LogsPipelinesApiExample {

    public static void main(String[] args) {
        LogsPipelinesApi apiInstance = new LogsPipelinesApi();
        String pipelineId = pipelineId_example; // String | ID of the pipeline to delete
        LogsPipeline body = ; // LogsPipeline | 
        try {
            LogsPipeline result = apiInstance.updateLogsPipeline(pipelineId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsPipelinesApi#updateLogsPipeline");
            e.printStackTrace();
        }
    }
}