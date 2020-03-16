import com.datadog.api.v2.client.api.LogsIndexesApi;

public class LogsIndexesApiExample {

    public static void main(String[] args) {
        LogsIndexesApi apiInstance = new LogsIndexesApi();
        LogsIndexesOrder body = ; // LogsIndexesOrder | 
        try {
            LogsIndexesOrder result = apiInstance.updateLogsIndexOrder(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsIndexesApi#updateLogsIndexOrder");
            e.printStackTrace();
        }
    }
}