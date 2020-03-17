import com.datadog.api.v1.client.api.AWSIntegrationApi;

public class AWSIntegrationApiExample {

    public static void main(String[] args) {
        AWSIntegrationApi apiInstance = new AWSIntegrationApi();
        try {
            array['String'] result = apiInstance.listAvailableAWSNamespaces();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSIntegrationApi#listAvailableAWSNamespaces");
            e.printStackTrace();
        }
    }
}