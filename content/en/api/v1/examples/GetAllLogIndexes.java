import com.datadog.api.v2.client.api.LogsIndexesApi;

public class LogsIndexesApiExample {

    public static void main(String[] args) {
        LogsIndexesApi apiInstance = new LogsIndexesApi();
        try {
            LogsIndexListResponse result = apiInstance.getAllLogIndexes();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling LogsIndexesApi#getAllLogIndexes");
            e.printStackTrace();
        }
    }
}