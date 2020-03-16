import com.datadog.api.v2.client.api.LogsApi;

public class LogsApiExample {

    public static void main(String[] args) {
        LogsApi apiInstance = new LogsApi();
        HTTPLog body = ; // HTTPLog | 
        try {
            Object result = apiInstance.sendLog(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsApi#sendLog");
            e.printStackTrace();
        }
    }
}