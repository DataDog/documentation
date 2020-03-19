import com.datadog.api.v1.client.api.AWSLogsIntegrationApi;

public class AWSLogsIntegrationApiExample {

    public static void main(String[] args) {
        AWSLogsIntegrationApi apiInstance = new AWSLogsIntegrationApi();
        AWSAccountAndLambdaRequest body = ; // AWSAccountAndLambdaRequest | 
        try {
            Object result = apiInstance.addAWSLambdaARN(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSLogsIntegrationApi#addAWSLambdaARN");
            e.printStackTrace();
        }
    }
}