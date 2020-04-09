import com.datadog.api.v1.client.api.LogsIndexesApi;

public class LogsIndexesApiExample {

    public static void main(String[] args) {
        LogsIndexesApi apiInstance = new LogsIndexesApi();
        try {
            LogsIndexesOrder result = apiInstance.getLogsIndexOrder();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsIndexesApi#getLogsIndexOrder");
            e.printStackTrace();
        }
    }
}