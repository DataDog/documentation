import com.datadog.api.v2.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        SyntheticsDeleteTestsPayload body = ; // SyntheticsDeleteTestsPayload | 
        try {
            SyntheticsDeleteTestsResponse result = apiInstance.deleteTests(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#deleteTests");
            e.printStackTrace();
        }
    }
}