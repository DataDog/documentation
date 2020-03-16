import com.datadog.api.v2.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String publicId = publicId_example; // String | The public id of the test to get details from
        SyntheticsTestDetails body = ; // SyntheticsTestDetails | 
        try {
            SyntheticsTestDetails result = apiInstance.updateTest(publicId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#updateTest");
            e.printStackTrace();
        }
    }
}