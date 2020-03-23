import com.datadog.api.v1.client.api.LogsPipelinesApi;

public class LogsPipelinesApiExample {

    public static void main(String[] args) {
        LogsPipelinesApi apiInstance = new LogsPipelinesApi();
        String pipelineId = pipelineId_example; // String | ID of the pipeline to delete
        try {
            apiInstance.deleteLogsPipeline(pipelineId);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsPipelinesApi#deleteLogsPipeline");
            e.printStackTrace();
        }
    }
}