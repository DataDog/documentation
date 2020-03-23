import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String publicId = publicId_example; // String | The public id of the browser test to which the target result belongs
        String resultId = resultId_example; // String | The id of the result to get
        try {
            SyntheticsBrowserTestResultFull result = apiInstance.getBrowserTestResult(publicId, resultId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#getBrowserTestResult");
            e.printStackTrace();
        }
    }
}