import com.datadog.api.v2.client.api.AWSLogsIntegrationApi;

public class AWSLogsIntegrationApiExample {

    public static void main(String[] args) {
        AWSLogsIntegrationApi apiInstance = new AWSLogsIntegrationApi();
        AWSAccountAndLambdaRequest body = ; // AWSAccountAndLambdaRequest | 
        try {
            Object result = apiInstance.deleteAWSLambdaARN(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSLogsIntegrationApi#deleteAWSLambdaARN");
            e.printStackTrace();
        }
    }
}