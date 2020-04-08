import com.datadog.api.v1.client.api.TracingApi;

public class TracingApiExample {

    public static void main(String[] args) {
        TracingApi apiInstance = new TracingApi();
        array[array[Span]] body = ; // array[array[Span]] | 
        try {
            apiInstance.submitTraces(body);
        } catch (ApiException e) {
            System.err.println("Exception when calling TracingApi#submitTraces");
            e.printStackTrace();
        }
    }
}