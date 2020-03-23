import com.datadog.api.v1.client.api.LogsIndexesApi;

public class LogsIndexesApiExample {

    public static void main(String[] args) {
        LogsIndexesApi apiInstance = new LogsIndexesApi();
        String name = name_example; // String | Name of the log index.
        try {
            LogsIndex result = apiInstance.getLogsIndex(name);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsIndexesApi#getLogsIndex");
            e.printStackTrace();
        }
    }
}