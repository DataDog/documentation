import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        SyntheticsTestDetails body = ; // SyntheticsTestDetails | 
        String fromTestId = fromTestId_example; // String | Public id of the test to clone, undefined if the test is created ex nihilo
        try {
            SyntheticsTestDetails result = apiInstance.createTest(body, fromTestId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#createTest");
            e.printStackTrace();
        }
    }
}