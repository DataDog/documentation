import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String publicId = publicId_example; // String | The public id of the Synthetics test to update
        SyntheticsSetTestPauseStatusPayload body = ; // SyntheticsSetTestPauseStatusPayload | 
        try {
            'Boolean' result = apiInstance.setTestPauseStatus(publicId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#setTestPauseStatus");
            e.printStackTrace();
        }
    }
}