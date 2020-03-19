import com.datadog.api.v1.client.api.LogsApi;

public class LogsApiExample {

    public static void main(String[] args) {
        LogsApi apiInstance = new LogsApi();
        LogsListRequest body = ; // LogsListRequest | 
        try {
            LogsListResponse result = apiInstance.listLogs(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsApi#listLogs");
            e.printStackTrace();
        }
    }
}