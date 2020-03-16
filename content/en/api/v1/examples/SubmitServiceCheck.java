import com.datadog.api.v2.client.api.ServiceChecksApi;

public class ServiceChecksApiExample {

    public static void main(String[] args) {
        ServiceChecksApi apiInstance = new ServiceChecksApi();
        array[ServiceCheck] body = ; // array[ServiceCheck] | 
        try {
            IntakePayloadAccepted result = apiInstance.submitServiceCheck(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceChecksApi#submitServiceCheck");
            e.printStackTrace();
        }
    }
}