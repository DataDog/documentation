import com.datadog.api.v2.client.api.MetricsApi;

public class MetricsApiExample {

    public static void main(String[] args) {
        MetricsApi apiInstance = new MetricsApi();
        MetricsPayload body = ; // MetricsPayload | 
        try {
            IntakePayloadAccepted result = apiInstance.submitMetrics(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling MetricsApi#submitMetrics");
            e.printStackTrace();
        }
    }
}