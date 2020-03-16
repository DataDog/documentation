import com.datadog.api.v2.client.api.AWSIntegrationApi;

public class AWSIntegrationApiExample {

    public static void main(String[] args) {
        AWSIntegrationApi apiInstance = new AWSIntegrationApi();
        AWSAccount body = ; // AWSAccount | 
        try {
            AWSAccountCreateResponse result = apiInstance.createAWSAccount(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSIntegrationApi#createAWSAccount");
            e.printStackTrace();
        }
    }
}