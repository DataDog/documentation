import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String publicId = publicId_example; // String | The public id of the test to get details from.
        try {
            SyntheticsTestDetails result = apiInstance.getTest(publicId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#getTest");
            e.printStackTrace();
        }
    }
}