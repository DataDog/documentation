import com.datadog.api.v2.client.api.AWSIntegrationApi;

public class AWSIntegrationApiExample {

    public static void main(String[] args) {
        AWSIntegrationApi apiInstance = new AWSIntegrationApi();
        AWSAccount body = ; // AWSAccount | 
        try {
            Object result = apiInstance.deleteAWSAccount(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSIntegrationApi#deleteAWSAccount");
            e.printStackTrace();
        }
    }
}