import com.datadog.api.v2.client.api.LogsIndexesApi;

public class LogsIndexesApiExample {

    public static void main(String[] args) {
        LogsIndexesApi apiInstance = new LogsIndexesApi();
        String name = name_example; // String | Name of the log index
        LogsIndex body = ; // LogsIndex | 
        try {
            LogsIndex result = apiInstance.updateLogsIndex(name, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsIndexesApi#updateLogsIndex");
            e.printStackTrace();
        }
    }
}