import com.datadog.api.v1.client.api.MonitorsApi;

public class MonitorsApiExample {

    public static void main(String[] args) {
        MonitorsApi apiInstance = new MonitorsApi();
        array[Object] body = ; // array[Object] | 
        try {
            array[Object] result = apiInstance.resolveMonitor(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MonitorsApi#resolveMonitor");
            e.printStackTrace();
        }
    }
}