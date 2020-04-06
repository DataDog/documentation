import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String publicId = publicId_example; // String | The public id of the Synthetics test to update
        SyntheticsUpdateTestPauseStatusPayload body = ; // SyntheticsUpdateTestPauseStatusPayload | 
        try {
            'Boolean' result = apiInstance.updateTestPauseStatus(publicId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#updateTestPauseStatus");
            e.printStackTrace();
        }
    }
}