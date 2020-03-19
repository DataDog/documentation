import com.datadog.api.v1.client.api.AWSIntegrationApi;

public class AWSIntegrationApiExample {

    public static void main(String[] args) {
        AWSIntegrationApi apiInstance = new AWSIntegrationApi();
        AWSAccount body = ; // AWSAccount | 
        try {
            AWSAccountCreateResponse result = apiInstance.generateNewAWSExternalID(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSIntegrationApi#generateNewAWSExternalID");
            e.printStackTrace();
        }
    }
}